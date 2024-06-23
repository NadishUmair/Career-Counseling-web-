
// const usermodel=require('../models/user');
// const adminModel=require('../models/admin');
const authSignupModel=require("../models/auth")
const bycrypt=require('bcrypt')



exports.login=async(req,res)=>{
    console.log(req.body);
    const {email,password}=req.body;
    console.log(req.body)
    try {
        const user=await authSignupModel.findOne({email})
        if(!user){
            return res.status(404).json({
                success:false,
                msg:"user not found"
            })
        }
        console.log(user);
         const matchpassowrd=await bycrypt.compare(password,user.password);
         if(!matchpassowrd){
            return res.status(409).json({
                success:false,
                msg:'Password not matched'
            })
         }
        
        res.status(200).json({
            success:true,
            msg:`user login as ${user.role}`,
            user
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}
