const router = require("express").Router();

const {isAdmin, isAuthenticated, isSignedIn} = require("../controllers/auth.controller");
const {getUserById, getUser, getUsers} = require("../controllers/user.controller")

//getUserById
//if routes contain :userid this param will get the value and send to the controller
//it will populate req.profile with a object of user
router.param("userId", getUserById);

//getUser
router.get("/user/:userId",isSignedIn, isAuthenticated, getUser);

router.put("/user/:userId" ,isSignedIn, isAuthenticated,updateUser)

module.exports = router;  