const CryptoJS = require("crypto-js");
const { Cart, Product, User } = require('../models');
const asyncHandler = require("express-async-handler");

// @des   Update a new user
// @route PUT /api/users/:id
// @access Private
const updateUser = asyncHandler (async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
    res.json(updatedUser)
})

// @des   Delete a user
// @route DEL /api/users/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
   const deletedUser = await User.findOneAndDelete(req.params.id)
    res.json(deletedUser)
})

// @des   Get single user by id
// @route GET /api/users/find/:id
// @access Private/Admin
const getSingleUser = asyncHandler(async (req, res) => {
    const foundUser = await User.findById(req.params.id)

    const { password, ...others } = foundUser
    res.json({ ...others })
})

// @des   Get all users
// @route GET /api/users/
// @access Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
    const query = req.query.new
    const foundUsers = query ?
        await User.find().sort({ createdAt: -1 }).limit(5) :
        await User.find()

    res.json(foundUsers)
})

// @des   Get user stats
// @route GET /api/users/stats
// @access Private/Admin
const getUserStats = asyncHandler(async (req, res) => {
    const date = new Date()
    const lastYear = new Date(date.getFullYear() - 1)
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);

        res.status(201).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
})

// @des   Get user wish list
// @route GET /api/users/wishlist
// @access Private
const getUserWishlist = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const foundUser = await User.findById(userId).populate('wishlist')
    res.json(foundUser)
})

// @des   Save user cart
// @route GET /api/users/cart
// @access Private
const userCart = asyncHandler(async (req, res) => {
    const { cart } = req.body

    const foundUser = await User.findById(req.user._id)

    const alreadyExistCart = await Cart.findOne({ userId: foundUser._id })
    if (alreadyExistCart) {
        alreadyExistCart.deleteOne()
    }

    let lineItems = []
    for (let i = 0; i < cart.length; i++) {
        let lineItem = {}
        lineItem["product"] = cart[i].product
        lineItem["quantity"] = cart[i].quantity
        lineItem["size"] = cart[i].size
        lineItem["color"] = cart[i].color
        const productPrice = await Product.findById(cart[i].product).select("price").exec();
        lineItem["price"] = productPrice.price
        lineItems.push(lineItem)
    }

    const cartTotal = lineItems.reduce((acc, curr) => {
        return acc + Number(curr.price) * Number(curr.quantity)
    }, 0)

    let newCart = await new Cart({
        products: lineItems,
        cartTotal,
        userId: foundUser?._id,
    }).save()

    res.json(newCart)
})

// @des   Get user cart
// @route GET /api/users/cart
// @access Private
const getUserCart = asyncHandler(async (req, res) => {
    const foundUser = await Cart.findOne({ userId: req.user._id }).populate('products.product')

    res.json(foundUser)
})

// @des   Empty cart
// @route GET /api/users/cart
// @access Private
const emptyCart = asyncHandler(async (req, res) => {
    const foundUser = await Cart.findOne({ _id: req.user._id })
    const cart = await Cart.findOneAndRemove({ userId: foundUser._id })

    res.json(cart)
})

module.exports = {
    getSingleUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserCart,
    emptyCart,
    userCart,
    getUserWishlist,
    getUserStats
}