
const mongoose=require('mongoose')
const {Schema}=mongoose

const authSignupSchema=new Schema({
    firstname:String,
    lastname:String,
    email:String,
    phone:String,
    password:String,
    role:String,
    avatar:String,
    education:String,
    forgetPasswordOtp:String,
    forgetPasswordOtpExpiry:String,
    resetPasswordToken:{
        type:String,
        default:null
    },
    resetPasswordTokenExpiry:{
        type:Date,
        default:null
    }

},{
    timestamps:true
})

const authSignupModel= new mongoose.model('authSignup', authSignupSchema)
module.exports= authSignupModel;