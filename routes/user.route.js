const router = require("express").Router();

const {isAdmin, isAuthenticated, isSignedIn, isSeller} = require("../controllers/auth.controller");
const {getUserById, getUser, getUsers, updateUser, createShop,confirmSeller} = require("../controllers/user.controller")

//getUserById
//if routes contain :userid this param will get the value and send to the controller
//it will populate req.profile with a object of user
router.param("userId", getUserById);

//getAllusers *delete*route 
router.get("/user", getUsers)

//getUser
router.get("/user/:userId",isSignedIn, isAuthenticated, getUser);
//update user
router.put("/user/:userId/update" ,isSignedIn, isAuthenticated,updateUser);

//get order from user id
// router.get("/order/user/:userId" ,isSignedIn, isAuthenticated, userPurchaseList);
//confirm seller
router.put("/user/:userId/becomeSeller", isSignedIn, isAuthenticated,confirmSeller)
//create shop
router.post("/user/createshop/:userId", isSignedIn, isAuthenticated, createShop)
module.exports = router;  