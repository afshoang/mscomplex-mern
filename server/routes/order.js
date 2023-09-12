const router = require('express').Router()
const { createOrder, getAllOrders, getOrders, updateOrder  } = require('../controllers/orderController');
const { verifyTokenAndAuthenticate, isAdmin } = require('../middlewares/verifyToken');

router.post("/", verifyTokenAndAuthenticate, createOrder)
router.get("/", verifyTokenAndAuthenticate, getOrders)

router.get("/all", verifyTokenAndAuthenticate, isAdmin, getAllOrders)

router.put("/:id", verifyTokenAndAuthenticate, isAdmin, updateOrder)



// router.get("/income", verifyTokenAndAuthenticate, isAdmin

module.exports = router