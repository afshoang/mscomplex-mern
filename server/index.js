const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const { authRoute, userRoute, orderRoute, productRoute, uploadRoute } = require('./routes');
const connectDB = require('./config/db')
const { errorHandler, notFound } = require('./middlewares/errorHandler')

const app = express()

connectDB()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/orders", orderRoute)
app.use("/api/products", productRoute)
app.use("/api/users", userRoute)
app.use("/api/upload", uploadRoute)

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
    console.log('SERVER IS LISTENING PORT', process.env.PORT);
})
