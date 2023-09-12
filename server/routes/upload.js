const express = require("express");
const { uploadImages } = require("../controllers/uploadController");
const { verifyTokenAndAuthenticate, isAdmin } = require('../middlewares/verifyToken');
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage");
const router = express.Router();

router.post(
    "/",
    verifyTokenAndAuthenticate,
    isAdmin,
    uploadPhoto.array("images", 10),
    productImgResize,
    uploadImages
);

module.exports = router