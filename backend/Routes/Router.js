const express= require("express")
const userSignupController=require("../controller/signupcontroller")
const userLogin= require("../controller/logincontroller")
const uploadProduct= require("../controller/Uploadproduct")
const { addProductToCart } = require("../controller/Cart")
const authToken = require("../middelware/authToken")
const GetProduct = require("../controller/Getproduct")
const Getcart = require("../controller/Getcart")
const Getproductbyid= require("../controller/Getbyidproduct")
const router= express.Router()

  router.post("/signup",userSignupController)
  router.post("/login",userLogin)

  router.post("/upload-Product",authToken,uploadProduct)
  router.post("/addtocart",authToken,addProductToCart),
  router.get("/get-product",GetProduct)
  router.get("/get-cart",authToken,Getcart)
  router.get('/products/:productId',Getproductbyid);
module.exports=router