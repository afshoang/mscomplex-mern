const CryptoJS = require("crypto-js");

const users = [
    {
        username: 'admin',
        email: 'admin@gmail.com',
        password: CryptoJS.AES.encrypt("123456", process.env.SECRET_KEY).toString(),
        isAdmin: true,
    },
    {
        username: 'hoang',
        email: 'hoang@gmail.com',
        password: CryptoJS.AES.encrypt("123456", process.env.SECRET_KEY).toString(),
    },
    {
        username: 'minh',
        email: 'minh@gmail.com',
        password: CryptoJS.AES.encrypt("123456", process.env.SECRET_KEY).toString(),
    },
];

module.exports = users;
