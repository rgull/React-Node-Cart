const CartModel = require('../models/CartModel');
const ProductModel = require('../models/ProductModel'); 
const UserModel = require('../models/userModel'); 


// // 2. Get a user's cart
// const getCart = async (req, res) => {
//     try {
//         const { userId } = req.params;

//         // Find the cart for the user
//         const cart = await CartModel.findOne({ userId }).populate('products.productId');
//         if (!cart) {
//             return res.status(404).json({ message: 'Cart not found', error: true });
//         }

//         res.status(200).json({
//             message: 'Cart retrieved successfully',
//             data: cart,
//             success: true,
//             error: false
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: error.message || 'Something went wrong',
//             error: true,
//             success: false
//         });
//     }
// };

// 3. Add a product to the cart
const addProductToCart = async (req, res) => {
    try {
        const {  productId, quantity } = req.body;
        const userId=req.user.id

        console.log(userId)
        // Validate the request body
        if (!userId || !productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Find existing cart for the user
        let cart = await CartModel.findOne({ userId });

        if (cart) {
            // Check if product exists in cart
            const productIndex = cart.products.findIndex(
                p => p.productId.toString() === productId
            );

            if (productIndex > -1) {
                // Product exists, update quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // Product doesn't exist, add new product
                cart.products.push({ productId, quantity });
            }

            cart = await cart.save();
        } else {
            // Create new cart if it doesn't exist
            cart = await CartModel.create({
                userId,
                products: [{ productId, quantity }]
            });
        }

        // Populate product details
        await cart.populate('products.productId');

        res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding item to cart',
            error: error.message
        });
    }
}




module.exports = {
    // createCart,
    // getCart,
    addProductToCart,
};
