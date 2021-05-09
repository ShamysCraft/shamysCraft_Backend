const router = require("express").Router()

const { isSignedIn, isAuthenticated } = require("../controllers/auth.controller")
const {getToken, processPayment} = require("../controllers/paymentBRoutes.controller");

const { getUserById } = require("../controllers/user.controller");

router.param("userId",getUserById);

// router.param("userId")
// get route
router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken)

// post route 
//  to have a transaction
router.post("/payment/braintree/:userId", isSignedIn, isAuthenticated, processPayment)

module.exports = router;
