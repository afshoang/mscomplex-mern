import users from './data/users.js';
import products from './data/products.js';
const connectDB = require('./utils/db')
const { 
    Order,
    Product,
    User
 } = require('./models');


require('dotenv').config()

connectDB();

const importData = async () => {
    try {
        // clear anything in database
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // array of created users
        const createdUser = await User.insertMany(users);

        // get id of admin user
        // const adminUser = createdUser[0]._id;

        // // add id admin user to every product
        // const sampleProducts = products.map((product) => {
        //     return {
        //         ...product,
        //         user: adminUser,
        //     };
        // });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroytData = async () => {
    try {
        // clear anything in database
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroytData();
} else {
    importData();
}
