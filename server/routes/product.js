const router = require('express').Router()
const { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct, addProductToWishList } = require('../controllers/productController');
const { verifyTokenAndAuthenticate, isAdmin } = require('../middlewares/verifyToken');


router.post("/", verifyTokenAndAuthenticate, isAdmin, createProduct)

router.get("/:id", getSingleProduct)
router.put("/wishlist", verifyTokenAndAuthenticate, addProductToWishList)

router.put("/:id", verifyTokenAndAuthenticate, isAdmin, updateProduct) 
router.delete("/:id", verifyTokenAndAuthenticate, isAdmin, deleteProduct)

router.get("/", getAllProducts)

module.exports = router