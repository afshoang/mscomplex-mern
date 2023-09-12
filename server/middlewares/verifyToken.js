const jwt = require("jsonwebtoken");
const { User } = require('../models');

const verifyTokenAndAuthenticate = async (req, res, next) => {
    let authHeader = req.headers.authorization

    if (authHeader) {
        try {
            authHeader = authHeader.split(" ")?.[1]
            const decoded = jwt.verify(authHeader, process.env.JWT_SECRET_KEY);

            req.user = await User.findById(decoded.id).select('-password');
            next()
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        return res.status(401).json("You are not authenticated")
    }
}

const isAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next()
    } else {
        res.status(403).json("You are not allowed to do that!")
    }
}

module.exports = {
    verifyTokenAndAuthenticate,
    isAdmin
}