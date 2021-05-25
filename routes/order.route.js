const router = require("express").Router()

const {
    isSignedIn,
    isAuthenticated,
    isAdmin } = require("../controllers/auth.controller")

const { 
    getUserById,
    pushOrderInPurchaseList } = require("../controllers/user.controller")

const { updateStock } = require("../controllers/product.controller")

const { 
    getOrderById,
    createOrder,
    getAllOrders,
    getOrderStatus,
    updateStatus
} = require("../controllers/order.controller")

//params
router.param("userId",getUserById);
router.param("orderId",getOrderById)

//create order
router.post("/order/create/:userId",isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder ,createOrder)

// readOrder
router.get("/order/all/:userId", isSignedIn, isAuthenticated, getAllOrders)

//listOrder middleware

//getOrderStatus
router.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getOrderStatus)
//updateOrderStatus
router.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin ,updateStatus)

module.exports = router;