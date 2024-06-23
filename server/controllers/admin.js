
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const adminModel=require('../models/admin')

exports.createadmin=async(req,res)=>{
    // firstname:String,
    // lastname:String,
    // universityname:String,
    // city:String,
    // phone:String,
    // postalcode:String,
    // universityaddress:String,
    // email:String,
    // password:String,
    // role:String,
    // avatar:String,
    const {  firstname, lastname, universityname,
        city, phone, postalcode, universityaddress, email, password,avatar}=req.body;
         console.log(req.body);
          const hashedpassword=await bcrypt.hash(password,10)
        try {
             const existuser=await adminModel.findOne({email});
             if(existuser){
                return res.status(400).json({
                    success:false,
                    msg:"Email Already Exist",
                })
             }
             
            const userdata=new adminModel({
              firstname,
              lastname,
              universityaddress,
              universityname,
              city,
              phone,
              postalcode,
              email,
              password:hashedpassword,
              role:'admin',
              avatar
            })
            const token= jwt.sign({
                email:userdata.email,
                id:userdata.id
            },
            process.env.JWT_SECRET
            )
            await userdata.save();
            res.status(200).json({
                msg:"Signup Successfuly ",
                userdata,
                token
            })
            
        } catch (error) {
            res.status(500).json({
                msg:"Internal Server error",
                // error: error.message
            })
        }



}



exports.singleuser=async(req,res)=>{
    const {id}=req.body;
    try {
         const user=await adminModel.findOne({id});

         res.status(200).json({
            success:true,
            msg:'user loged in succesfuly',
            user

         })
    } catch (error) {
         res.status(500).send(error.message)
    }
}