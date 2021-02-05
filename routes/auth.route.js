const router = require("express").Router();
const { check } = require('express-validator');
const { getUserById, signup, signin, signout, isSignedIn} = require("../controllers/auth.controller")

//getuserId
router.param("userId", getUserById);

//user sign out 
router.get("/signout",signout);

//usersignin
router.post("/signin", [
    check("email", "email is required").isEmail(),
    check("password", "invalid password").isLength({min:1})
],signin);

//create user
router.post("/signup",[
check('fname',"first name is required").not().isEmpty(),
check('lname',"lastn name is required").not().isEmpty(),
check('email', "email should be email").isEmail(),
check('password',"Password is required").not().isEmpty()

],signup)

router.get("/testRoute", isSignedIn, (req,res)=>{
    res.send("A protected route")
});

module.exports = router;