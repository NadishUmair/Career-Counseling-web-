const nodemailer=require('nodemailer');
const adminmodel=require('../models/admin')
const usermodel=require('../models/user')
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const SendresetPasswordEmail=async(email,resetToken)=>{
    
    try {
        
        const transpoter=nodemailer.createTransport({
            service:"Gmail",
            port:587,
            secure:false,
            auth:{
                user:process.env.SMTP_EMAIL,
                pass:process.env.SMTP_PASSWORD
            }
        })
       const resetlink= `http://localhost:5200/user/changepassword/${resetToken}`
        const Mailoptions={
            from:process.env.SMTP_EMAIL,
            to:email,
            body:"Reset Password",
            html:`<p>Hy this email is for reset password</p> <P>${resetlink}</P>`

        }
        await transpoter.sendMail(Mailoptions);
       
    } catch (error) {
        console.log(error)
    }
}





function generateResetToken(user){
       console.log(user);
   return jwt.sign({
    email:user.email,
    id:user._id,
    accountType:user.role
},
   process.env.JWT_SECRET,{expiresIn:"1h"}  )
   
}

exports.forgetpassword=async(req,res)=>{
    const {email,accountType}=req.body;
    console.log(req.body);
    try {
        let user;
        if(accountType==="admin"){
             user=await adminmodel.findOne({email});
            if(!user){
                return res.status(404).json({
                    success:false,
                    msg:"User with given mail is not registered as admin"
                }) }
        }else if(accountType==="user"){
            user=await usermodel.findOne({email})
            if(!user){
                return res.status(200).json({
                    success:false,
                    msg:"User not found as user"
                })
            }
        }
        else{
            return res.status(404).json({
                success:"this email is not registered"
            })
        }
        const resetToken=generateResetToken(user);
            user.resetPasswordToken=resetToken;
            user.resetPasswordTokenExpiry= Date.now() + 3600000;
            await user.save();
            await SendresetPasswordEmail(email,resetToken);
        res.status(200).json({
            success:true,
            msg:"email send succesfully check you email link send to you"

        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}


exports.resetPassword = async (req, res) => {
    console.log(req.body);
    const { resetToken } = req.params;
    const { password } = req.body;

    try {
        const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
        const { email, id, accountType } = decoded;
        console.log(decoded);
        let user;
        if (accountType === "admin") {
            user = await adminmodel.findOne({ email, _id: id });
            console.log(user);
        } else if (accountType === "user") {
            user = await usermodel.findOne({ email, _id: id });
            console.log(user);
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                mag: "User does not exist"
            });
        }

        if (user.resetPasswordToken !== resetToken) {
            return res.status(404).json({
                success: false,
                mag: "Invalid token"
            });
        }

        if (user.resetPasswordTokenExpiry < Date.now()) {
            return res.status(404).json({
                success: false,
                mag: "Token expired"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordTokenExpiry = null; // Assuming you set this value after generating the token.
        await user.save();
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.JWT_EMAIL,
            to: email,
            subject: "Password Changed Successfully",
            html: '<p>Your password has been changed successfully. You can now login to your account.</p>'
        };

        await transporter.sendMail(mailOptions);
        
        res.status(200).json({
            success: true,
            msg: "Password changed successfully"
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
};
