const mongoose=require('mongoose')
const url="mongodb://localhost:27017/CareerCounselling"
// mongodb+srv://nadish:nadish123@cluster0.ebv6jwb.mongodb.net/dbdata
const mongo_uri=process.env.MONGO_URI
const ConnectDb=()=>{
    mongoose.connect(mongo_uri).then(()=>{
        console.log('database connected succesfuly')
    }).catch((error)=>{
      console.log("error in connection",error)
    })

    }

    module.exports=ConnectDb;
    