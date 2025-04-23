
const ProductModel = require("../models/ProductModel");

const GetProductbyid = async (req, res) => {
    try {
      console.log("Received productId:", req.params.productId); // Log productId from the URL
      const product = await ProductModel.findById(req.params.productId);
      console.log("Found product:", product); // Log the product object from the database
  
      if (product) {
        return res.status(200).json({
          product: product, // Return the product
          message: "Successfully found product",
          success: true
        });
      } else {
        return res.status(404).json({
          message: "Product not found",
          success: false
        });
      }
    } catch (error) {
      console.error("Error fetching product:", error); // Log any error
      res.status(500).json({ 
        message: error.message || "Internal Server Error",
        error: true,
        success: false
      });
    }
  };
  


  module.exports= GetProductbyid