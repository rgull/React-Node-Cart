const mongoose=require("mongoose")
require('dotenv').config();

async function connectDB() {
   try {
     await mongoose.connect("mongodb://localhost:27017/E-coomerce")
   } catch (error) {
    console.log(error)
   }
}
module.exports=connectDB