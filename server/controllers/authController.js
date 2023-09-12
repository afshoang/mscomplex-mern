const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { User } = require('../models');
const asyncHandler = require("express-async-handler");

// @des   Register a new user
// @route POST /api/auth/register
// @access Public
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    // HASH password
    const hashPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();

    const newUser = new User({
        username,
        email,
        password: hashPassword
    })
    const savedUser = await newUser.save()

    res.json(savedUser)

})

// @des   Login
// @route POST /api/auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    const foundUser = await User.findOne({
        username
    })
    // not found user
    if (!foundUser) res.json("Username hoặc password không hợp lệ!")

    // decrypt password
    const decryptedPassword = CryptoJS.AES.decrypt(foundUser.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== password) res.json("Wrong credential")

    const accessToken = jwt.sign({
        id: foundUser._id,
        isAdmin: foundUser.isAdmin
    }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });

    const { password: orginalPass, ...others } = foundUser._doc

    res.json({ ...others, accessToken })
    
})

module.exports = {
    register,
    login
}