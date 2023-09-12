const { Order, User, Product } = require('../models');
const asyncHandler = require("express-async-handler");

// @des   Create order
// @route POST /api/orders/create-order
// @access Private
const createOrder = asyncHandler(async (req, res) => {
    const foundUser = await User.findOne({ _id: req.user._id })

    const { shippingInfo, orderItems, totalPrice } = req.body

    const newOrder = await new Order({
        userId: foundUser._id,
        shippingInfo,
        orderItems,
        totalPrice
    }).save()

    // UPDATE QUANTITY PRODUT
    let update = orderItems.map(item => {
        return {
            updateOne: {
                filter: { _id: item.product._id },
                update: { $inc: { quantity: -item.quantity, sold: +item.quantity } }
            }
        }
    })
    const updatedProduct = await Product.bulkWrite(update, {})

    res.json({ newOrder, message: 'success' })
})

// @des   Get orders by user
// @route GET /api/orders/
// @access Private
const getOrders = asyncHandler(async (req, res) => {
    const userOrders = await Order.find({ userId: req.user._id })
        .populate("orderItems.product")
        .populate("userId")
        .exec();
    res.json(userOrders)
})

// @des   Get all Orders
// @route GET /api/orders/all
// @access Private
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
        .populate("products.product")
        .populate("userId")
        .exec();
    res.json(orders)
})

// @des   Update a order
// @route PUT /api/orders/:id
// @access Private/Admin
const updateOrder = asyncHandler(async (req, res) => {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
    res.json(updatedOrder)
})

// @des   Get monthly income
// @route GET /api/orders/income
// @access Private/Admin
// const getIncomes = asyncHandler(async (req, res) => {
//     const date = new Date()
//     const lastMonth = new Date(date.setMonth(date.getMonth() - 1)) // current month = 9 => lastMonth = 8
//     const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))  // current month = 9 => previousMonth = 7

//     try {
//         const income = await Order.aggregate([
//             { $match: { createdAt: { $gte: previousMonth } } }, // last 3 months
//             {
//                 $project: {
//                     month: { $month: "$createdAt" },
//                     sales: "$amount"
//                 }
//             },
//             {
//                 $group: {
//                     _id: "$month",
//                     total: { $sum: "$sales" }
//                 }
//             }
//         ])

//         res.status(200).json(income)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })

module.exports = {
    createOrder,
    getOrders,
    getAllOrders,
    updateOrder
}