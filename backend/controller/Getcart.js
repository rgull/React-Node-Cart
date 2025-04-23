

const CartModel = require('../models/CartModel');
const ProductModel = require('../models/ProductModel'); 
const UserModel = require('../models/userModel'); 

const Getcart= async (req, res) => {
    try {
        const userId=req.user.id


        const cart = await CartModel.findOne({ userId })
            .populate('products.productId');

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching cart',
            error: error.message
        });
    }}

module.exports=Getcart