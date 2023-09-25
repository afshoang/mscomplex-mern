const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const { Product, User } = require('../models');

// @des   Get all products
// @route GET /api/products
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
    let queryObj = { ...req.query }
    const excludeFields = ["page", "sort", "limit", "fields", "search"]
    excludeFields.forEach(el => delete queryObj[el])

    for (let q in queryObj) {
        if (queryObj[q] && queryObj[q]?.split(',')?.length > 1) {
            queryObj[q] = queryObj[q]?.split(',')
        }
    }
    
    let query = Product.find(queryObj)

    if (req.query.search) {
        query = Product.find({ title: { $regex: req.query.search } })
    }

    // SORTING
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ") 
        query = query.sort(sortBy)
    } else {
        query = query.sort("-createdAt")
    }

    // LIMIT FIELDS
    if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ")
        query = query.select(fields)
    } else {
        query = query.select("-__v")
    }

    // PAGINATION
    const page = req.query.page
    const limit = req.query.limit
    const skip = (page - 1) * limit
    if (req.query.page) {
        const numProduct = await Product.countDocuments()
        if (skip >= numProduct) throw new Error("This page does not exist")
    }
    query = query.skip(skip).limit(limit);

    const products = await Product.find(query)
    res.json(products)
})

// @des   Get single product by id
// @route GET /api/products/:id
// @access Public
const getSingleProduct = asyncHandler(async (req, res) => {
    const foundProduct = await Product.findById(req.params.id)

    res.json(foundProduct)
})

// @des   Create a new product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    if (req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    const newProduct = new Product(req.body)

    const savedProduct = await newProduct.save()
    res.json(savedProduct)
})

// @des   Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    if (req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    console.log("req.params.id", req.params.id);
    console.log("req.body", req.body);
    const updatedProduct = await Product.findByIdAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }, { new: true })
    res.json(updatedProduct)
})

// @des   Delete a product
// @route DEL /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const deleteProduct = await Product.findOneAndDelete({ _id: req.params.id });
    res.json(deleteProduct);
})

// @des   Add a product to wishlist of a user
// @route PUT /api/products/wishlist
// @access Private
const addProductToWishList = asyncHandler(async (req,res) => {
    const userId = req.user._id
    const productId = req.body.productId

    const user = await User.findById(userId)
    const alreadyAdded = user.wishlist.find(id => id.toString() === productId)

    if (alreadyAdded) {
        let user = await User.findByIdAndUpdate(userId, {
            $pull: { wishlist: productId }
        }, {
            new: true
        })
        res.json(user)
    } else {
        let user = await User.findByIdAndUpdate(userId, {
            $push: { wishlist: productId }
        }, {
            new: true
        })
        res.json(user)
    }
})


module.exports = { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct, addProductToWishList }