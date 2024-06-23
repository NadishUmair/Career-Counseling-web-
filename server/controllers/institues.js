const https = require('https');


const InstituteModel = require('../models/institute');

exports.AddInstitute=async(req,res)=>{
   console.log(req.body);
    const {title,description,category,InstituteLogo,instituteType,lastDate,startDate,adminId,discipline,degreelevel,city}=req.body;
    try {
       
        const  productData=new InstituteModel({
            title:title,
            description:description,
            category:category,
            adminId:adminId,
            InstituteLogo:InstituteLogo,
            instituteType:instituteType,
            lastDate:lastDate,
            startDate:startDate,
            discipline:discipline,
            degreelevel:degreelevel,
            city:city


        })
        productData.save();
        res.status(200).json({
            success:true,
            msg:"Product Added Sucessfuly"

        })
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.allInstitutes=async(req,res)=>{
    try {
        const unis=await InstituteModel.find();
        res.status(200).json({
            success:true,
            msg:"All Institutes fetched",
            unis
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
}



exports.myInstitutes=async(req,res)=>{
      const {id}=req.body;
      console.log(req.body);
    try {
           const myunis=await InstituteModel.find({adminId:id})

           res.status(200).json({
            success:true,
            msg:"posts available related to this id",
            myunis
           })
    } catch (error) {
        console.log(error)
          res.status(500).send(error.message);
    }
}


exports.deleteInstitute = async (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    console.log(id);
    try {
        const deletedItem = await InstituteModel.findByIdAndDelete(id);  // Pass id directly
        if (deletedItem) {
            res.status(200).json({
                success: true,
                msg: 'Item deleted successfully',
                deletedItem
            });
        } else {
            res.status(404).json({
                success: false,
                msg: 'Item not found'
            });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}



// exports.searchUni=async(req, res) => {
//     // Options for the external API request
//     const options = {
//         method: 'GET',
//         hostname: 'world-Institute-search-and-rankings.p.rapidapi.com',
//         path: '/search',
//         headers: {
//             'x-rapidapi-key': '4b7b3eadd2mshfc41c1c5d232400p12c9d0jsn7828f19ecbb1',
//             'x-rapidapi-host': 'world-Institute-search-and-rankings.p.rapidapi.com'
//         }
//     };

//     // Make a request to the external API
//     const externalRequest = https.request(options, (externalResponse) => {
//         let chunks = '';

//         // Accumulate data chunks
//         externalResponse.on('data', (chunk) => {
//             chunks += chunk;
//         });

//         // When response ends, send data to the client
//         externalResponse.on('end', () => {
//             res.json(JSON.parse(chunks));
//         });
//     });

//     // Handle errors
//     externalRequest.on('error', (error) => {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred while fetching data from the external API' });
//     });

//     externalRequest.end();
// };