const ProductModel = require("../models/ProductModel");

const GetProduct = async (req, res) => {
  try {
    const products = await ProductModel.find({});

    if (products.length > 0) { 
      return res.status(200).json({
        products: products,
        message: "Successfully found",
        success: true
      });
    } else {
      return res.status(404).json({
        message: "No products found",
        success: false
      });
    }
  } catch (error) {
    res.status(500).json({ 
      message: error.message || "Internal Server Error",
      error: true,
      success: false
    });
  }
};

module.exports = GetProduct;
