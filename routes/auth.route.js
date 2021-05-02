const router = require("express").Router();
const { check } = require('express-validator');
const { signup, signin, signout, isSignedIn , isUserExist} = require("../controllers/auth.controller")



//user sign out 
router.get("/signout",signout);

//usersignin
router.post("/signin", 
[
    check("email", "Please enter a valid e-mail!").isEmail(),
    check("password", "invalid password").not().isEmpty()
]
,signin);

//create user
router.post("/signup",
[
check('fname',"Enter the first name!").not().isEmpty(),
check('lname',"Enter the last name!").not().isEmpty(),
check('email', "Please enter a valid e-mail!").isEmail(),
check('password',"Password is required!").not().isEmpty(),
check('password',"Password: Use 8 or more characters").isLength({min:8}),

]
,isUserExist, signup)

router.get("/testRoute", isSignedIn, (req,res)=>{
    res.send("A protected route")
});

module.exports = router;