require('dotenv').config()
const slugify = require("slugify");

const { User, Product } = require('../models');
const connectDB = require('../config/db');
const products = require('../data/products');
const users = require('../data/users');

connectDB()

const importData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()

        const sampleProducts = products.map(product => {
            product.slug = slugify(product.title);
            return product
        })

        await Product.insertMany(sampleProducts);
        await User.insertMany(users);

        console.log('Data Imported!');

        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const destroytData = async () => {
    try {
        // clear anything in database
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.log(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroytData();
} else {
    importData();
}