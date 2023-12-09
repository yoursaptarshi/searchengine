const crawledModel = require("../models/Crawled")
const imgModel = require("../models/Crawledimg")

exports.searchresults = async(req,res)=>{
    const {query} = req.body;
    try{
        // options i -> makes search in sensetive and .* *. means search the only query part from the whole title
        const webResults = await crawledModel.find({titles:{ $regex: `.*${query}.*`, $options: 'i' } });
        const imgResults = await imgModel.find({alt: { $regex: `.*${query}.*`, $options: 'i' }})
        res.status(200).json({
            success:true,
            webResults:webResults,
            imgResults:imgResults
        })
    }
    catch(error){
        res.status(200).json({
            success:false,
            message:error.message
        })
    }
}