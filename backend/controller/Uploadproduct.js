

// const UploadProductPermission = require("../../helpers/UploadProductPermission")
const ProductModel=require("../models/ProductModel")

const uploadProduct= async(req,res)=>{
    try {
const sessionUserId=req.user.id

if(!sessionUserId){
throw new Error("Permission denied")
}


const uploadproduct= new ProductModel (req.body)
const saveproduct= uploadproduct.save()
        res.json({
            message:"Product uploaded successfully",
            data:saveproduct,
            success:true,
            error:false
        })
    } catch (error) {
        res.json({
            message: error.message||error,
            error: true,
            success: false
        })
    }
}

module.exports=uploadProduct