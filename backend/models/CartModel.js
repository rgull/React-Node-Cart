const mongoose = require('mongoose');

const CartSchema =  mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // reference to the User model
      ref: 'User',
      required: true
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId, // reference to the Product model
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1 // ensuring that the quantity is at least 1
        }
      }
    ]
  },
  { timestamps: true } // adds createdAt and updatedAt fields
);

const CartModel = mongoose.model('Cart', CartSchema);

module.exports = CartModel;
