
const userModel=require('../models/user')
const adminModel=require('../models/admin')


exports.updateuser=async(req,res)=>{
    console.log(req.body);
      const {role,_id}=req.body;
      const body=req.body;
      try {
           let user;
            if(role === 'user'){
                user=await userModel.findByIdAndUpdate(_id,body,{new:true})
            }else if(role === 'admin'){
              user=await adminModel.findByIdAndUpdate(_id,body,{new:true})
            }else{
                resizeBy.status(404).json({
                    success:false,
                    msg:"user not found"
                })
            }
            res.status(200).json({
                success:true,
                msg:"User Update Successfuly",
                user
            })
      } catch (error) {
          res.status(500).send(error.message);
      }
}