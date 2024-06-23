const mongoose=require('mongoose');
const {Schema}=mongoose;

const adminSchema=new Schema({
    firstname:String,
    lastname:String,
    universityname:String,
    city:String,
    phone:String,
    postalcode:String,
    universityaddress:String,
    email:String,
    password:String,
    role:String,
    avatar:String,
    resetPasswordToken:{
        type:String,
        default:null
    },
    resetPasswordTokenExpiry:{
        type:Date,
        default:null
    }
})

const adminModel=new mongoose.model('admin',adminSchema)
module.exports=adminModel;