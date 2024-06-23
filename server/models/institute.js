
const mongoose=require('mongoose');
const {Schema}=mongoose;

const InstituteSchema=new Schema({
    title:String,
    description:String,
    lastDate:String,
    startDate:String,
    category:String,
    InstituteLogo:String,
    instituteType:String,
    adminId:String,
    discipline:String,
    degreelevel:String,
    city:String
})

const InstituteModel=new mongoose.model('Institutesadmdates',InstituteSchema);
module.exports=InstituteModel;