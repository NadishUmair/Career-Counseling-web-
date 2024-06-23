

// const bcrypt=require('bcrypt')
// const jwt=require('jsonwebtoken')
// const usermodel = require("../models/user")

// exports.creatuser=async(req,res)=>{

//   const {firstname,lastname,email,phone,password,avatar}=req.body

//   const hashpassword=await bcrypt.hash(password,10);
//        try{
//         const existuser=await usermodel.findOne({email})
//         if(existuser){
//           return res.status(400).json({
//             success:false,
//             message:'Email already exist'
//           })
//         }
//             const userdata=new usermodel({
//               firstname:firstname,
//               lastname:lastname,
//               email:email,
//               phone:phone,
//               password:hashpassword,
//               role:'user',
//               avatar:avatar
//             })
//             const token=jwt.sign({
//               email:userdata.email,
//               id:userdata._id
//             },
//             process.env.JWT_SECRET,
//             )
//             await userdata.save()
//             res.status(201).json({
//               success:true,
//               message:'you are logged in succefully',
//               userdata: userdata,
//               token
//             })
  
//        }catch(error){
//          console.log('error in creating',error)
//          res.status(500).send(error.message)
//        }
//   }

 
// exports.singleuser=async(req,res)=>{
//   const  {id}=req.body;
//   try {
//        const user=await usermodel.findOne({id});

//        res.status(200).json({
//          success:true,
//          msg:"user fetched successfully",
//          user
//        })
//   } catch (error) {
//       res.status(500).send(error.message);
//   }
// }


//  const sendResetPasswordEmail=async(email,resetToken)=>{
//   try {
//     const transporter= nodemailer.createTransport({
//       service: "Gmail",
//       port: 587,
//       secure: false,
//       auth:{
//         user:process.env.SMTP_EMAIL,
//         pass:process.env.SMTP_PASSWORD
//       }
      
//     })
//     const resetLink=`http://localhost:3000/auth/reset-password/${resetToken}`
//     const mailoptions={
//       from:process.env.SMTP_EMAIL,
//       to:email,
//       subject:"Reset Your Password",
//       html:`<p>Hello,<p>Please click on the following link to reset your password</p>
      
//       <a href=${resetLink}>${resetLink}</a>
//       </p>`
//     }
//     await transporter.sendMail(mailoptions)
//     console.log(`Reset password send to ${email}`)
//   } catch (error) {
//     console.log('error in seding email',error.message)
//   }
//  }




// exports.forgetpassword = async (req, res) => {
//   const { email } = req.body
//   try {
//       const user = await Usermodel.findOne({ email })
//       if (!user) {
//           return res.status(404).json({
//               msg: "User not found"
//           })
//       }
//       const resetToken = jwt.sign({
//           email: user.email,
//           id: user._id
//       }, process.env.JWT_SECRET, { expiresIn: "1h" })
//       user.resetPasswordToken = resetToken,
//           user.resetPasswordTokenExpiry = Date.now() + 3600000
//       await user.save()

//       await sendResetPasswordEmail(email, resetToken)
//       res.status(200).json({
//           msg: "password reset token send to your email"
//       })
//   } catch (error) {
//       res.status(500).json({
//           msg: "Internal server error",
//           error
//       })
//   }
// }

// exports.resetpassword = async (req, res) => {
//   const { token } = req.params
//   const { password } = req.body;
//   try {
//       const user = await Usermodel.findOne({
//           resetPasswordToken: token,
//           resetPasswordTokenExpiry: {
//               $gt: Date.now()
//           }
//       })
//       if (!user) {
//           return res.status(400).json({
//               msg: "Invalid Token or expired token"
//           })
//       }
//       const hashedPassword = await bcrypt.hash(password, 10)
//       user.password = hashedPassword
//       user.resetPasswordToken = null;
//       user.resetPasswordTokenExpiry = null;
//       await user.save();

//       const resetEmail = user.email;
//       const mailOptions = {
//           from: process.env.SMTP_EMAIL,
//           to: resetEmail,
//           subject: "Reset your password",
//           html: `<h1>Password reset successfully</h1><p>Password reset successfully, you can now login with new password</p>`
//       }

//       const transporter = nodemailer.createTransport({
//           service: "gmail",
//           port: 587,
//           secure: false,
//           auth: {
//               user: process.env.SMTP_EMAIL,
//               pass: process.env.SMTP_PASSWORD
//           }
//       })
//       await transporter.sendMail(mailOptions)
//       console.log("Reset Password token", token)
//       res.status(200).json({
//           msg: "Password reset successfully"
//       })

//   } catch (error) {
//       res.status(500).json({
//           msg: "Internal server error",
//           error
//       })
//   }
// }

