const authRoute = require('./auth')
const userRoute = require('./user')
const orderRoute = require('./order')
const productRoute = require('./product')
const uploadRoute = require('./upload')

module.exports = {
    authRoute,
    orderRoute,
    productRoute,
    userRoute,
    uploadRoute
}