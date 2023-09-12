const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        shippingInfo: {
            fullName: {
                type: String,
                required: true,
            },
            phoneNumber: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            district: {
                type: String,
                required: true,
            },
            ward: {
                type: String,
                required: true,
            },
            notes: {
                type: String,
            },
            paymentMethod: {
                type: String,
                required: true,
            },
        },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product',
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                size: String,
                color: String,
            },
        ],
        totalPrice: { type: Number, required: true },
        status: { type: String, default: "Đã đặt hàng" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);