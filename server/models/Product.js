const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        description: { type: String, required: true },
        img: [
            {
                // public_id: String,
                url: String,
            },
        ],
        categories: { type: Array, required: true },
        size: { type: Array },
        color: { type: Array },
        price: { type: Number, required: true },
        tags: { type: String },
        sold: {
            type: Number,
            default: 0,
            select: false
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);