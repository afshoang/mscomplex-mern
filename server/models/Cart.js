const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                default: 1,
            },
            size: String,
            color: String,
            price: Number
        },
    ],
    cartTotal: { type: Number }
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);