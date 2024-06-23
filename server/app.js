
require('dotenv').config()
const cors=require('cors')
const express=require('express');
const app=express();
const ConnectDb = require('./database');
const port=5500;
const allrouters=require('./routers/allRouters')
ConnectDb();
app.use(express.json({ limit: "50mb" }))
app.use(cors());






app.use('/',allrouters)



app.listen(port,()=>{
    console.log('app is running at port',port)
})