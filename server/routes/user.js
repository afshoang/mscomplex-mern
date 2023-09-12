const router = require('express').Router()
const { updateUser, 
    getAllUsers, 
    getSingleUser, 
    deleteUser,
    getUserCart,
    emptyCart,
    userCart,
    getUserWishlist, 
    getUserStats 
} = require('../controllers/userController');
const { verifyTokenAndAuthenticate, isAdmin } = require('../middlewares/verifyToken');

router.put("/:id", verifyTokenAndAuthenticate, updateUser)
router.delete("/:id", verifyTokenAndAuthenticate, deleteUser)

router.get("/", verifyTokenAndAuthenticate, isAdmin, getAllUsers)

router.get("/cart", verifyTokenAndAuthenticate, getUserCart)
router.post("/cart", verifyTokenAndAuthenticate, userCart)
router.post("/empty-cart", verifyTokenAndAuthenticate, emptyCart)


router.get("/wishlist", verifyTokenAndAuthenticate, getUserWishlist)
router.get("/stats", verifyTokenAndAuthenticate, isAdmin, getUserStats)

router.get("/:id", verifyTokenAndAuthenticate, isAdmin, getSingleUser)
module.exports = router