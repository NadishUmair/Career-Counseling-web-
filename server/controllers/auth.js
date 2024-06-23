const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const authSignupModel= require('../models/auth');
const sendEmail = require('./sendEmail');

const generateOtp=()=>{
  return Math.floor(10000 + Math.random() * 900000).toString();
}
exports.creatuser=async(req,res)=>{

  const {firstname,lastname,email,phone,password,avatar,role}=req.body

  const hashpassword=await bcrypt.hash(password,10);
       try{
        const existuser=await authSignupModel.findOne({email})
        if(existuser){
          return res.status(400).json({
            success:false,
            message:'Email already exist'
          })
        }
            const userdata=new authSignupModel({
              firstname:firstname,
              lastname:lastname,
              email:email,
              phone:phone,
              password:hashpassword,
              role:role,
              avatar:avatar
            })
            const token=jwt.sign({
              email:userdata.email,
              id:userdata._id
            },
            process.env.JWT_SECRET,
            )
            await userdata.save()
            res.status(201).json({
              success:true,
              message:'you are logged in succefully',
              userdata: userdata,
              token
            })
  
       }catch(error){
         console.log('error in creating',error)
         res.status(500).send(error.message)
       }
  }
  

exports.getCounselors=async(req,res)=>{
    const role="counselor";
  try {
    const user=await authSignupModel.find({role}).select('-password');
    res.status(200).json({
      success:true,
      message:"counselors found Successffully",
      user
    })
    
  } catch (error) {
     res.status(500).send(error.message);
  }
}

exports.updateuser=async(req,res)=>{
  console.log(req.body);
    const {_id}=req.body;
    const body=req.body;
    try {
        
            const user=await authSignupModel.findByIdAndUpdate(_id,body,{new:true})
      
            await user.save();
          res.status(200).json({
              success:true,
              msg:"User Update Successfuly",
              user
          })
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.forgotPassword=async(req,res)=>{
   const {email}=req.body;
  try {
    const finduser=await authSignupModel.findOne({email});
    if(!finduser){
      return res.status(404).json({
        success: false,
        message: "User not found"
    });
    }
   
const otp=generateOtp();
const emailaddress=finduser.email;
finduser.forgetPasswordOtp=otp;
finduser.forgetPasswordOtpExpiry= Date.now() + 120000;
await finduser.save();
const emailsubject="reset passsword otp"
const message=`You one time reset password otp is ${otp} This OTP is valid for a 2 minutes. Do not share it with anyone`
const requestType="Your are requested for reset password"

await sendEmail(emailsubject,emailaddress,message,requestType);
    res.status(200).json({
      success:true,
      message:"Otp Send succesfully"
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

exports.verifyOtp=async(req,res)=>{
  const {otp}=req.body;
   const {email}=req.body;
   console.log(email);
  try {
    const finduser=await authSignupModel.findOne(email);
    if(finduser.forgetPasswordOtp !== otp || finduser.forgetPasswordOtpExpiry < Date.now()){
 return res.status(404).json({
      success:false,
      message:"otp expire or not exist"
    })
   }
   res.status(200).json({
    success:true,
    message:"otp matched Successffully"
   })
  } catch (error) {
    res.status(500).send("Internal Server Error")
  }
}


exports.ChangePassword=async(req,res)=>{
  const {newPassword,email}=req.body;
  try {
    const finduser=await authSignupModel.findOne(email);
    if(!finduser){
      return res.status(404).json({
        success:false,
        message:"Error try again later"
      })
    }
   finduser.psssword=newPassword;
   await finduser.save();
   res.status(200).json({
    success:true,
    message:"Password changed successfully"
   })
  } catch (error) {
    res.status.send("internal server error")
  }
}