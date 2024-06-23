const usermodel = require("../models/user");
const adminModel = require("../models/admin");

exports.singleuser=async(req,res)=>{
   const {role,id}=req.body
    console.log("signle user",req.body)
    try {
        let user;

        if(role === 'user'){
            user= await usermodel.findById(id).select('-password');

        }else if(role === 'admin'){
            user=await adminModel.findById(id).select('-password');

        }else {
            return res.status(404).json({
                success:false,
                msg:'user not exist'

            })
        }
        res.status(200).json({
            success:true,
            msg:"user found successfully",
            user
        })
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}