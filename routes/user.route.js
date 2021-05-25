const router = require("express").Router();

const {
    getUserById, 
    getUser, 
    getUsers, 
    updateUser, 
    userPurchaseList,
    getUserCount
} = require("../controllers/user.controller")
const {isSignedIn, isAuthenticated,isAdmin  } = require("../controllers/auth.controller");

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


router.get("/orders/user/:userId" ,isSignedIn, isAuthenticated, userPurchaseList);

router.get("/getUserCount/:userId",isSignedIn, isAuthenticated,isAdmin,getUserCount);

module.exports = router;  



// //confirm seller
// router.put("/user/:userId/becomeSeller", isSignedIn, isAuthenticated,confirmSeller)
// //create shop
// router.post("/user/createshop/:userId", isSignedIn, isAuthenticated, createShop)