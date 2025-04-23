const mongoose= require("mongoose")

 const ProductSchema=  mongoose.Schema({
    ProductName:String,
    description:String,
    price:Number,
   
},
{
    timestamps:true
}
)

const ProductModel= mongoose.model("Product",ProductSchema)

module.exports= ProductModel