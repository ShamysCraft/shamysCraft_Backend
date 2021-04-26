//import validator
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require("express-jwt")

//import user model
const User = require("../models/user");

//createUser
exports.signup = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        })
    }
    const data = req.body;
    const user = new User(data);
    user.save((err,user) => {
        if(err){
            res.status(400).json({
                error: "user cannot be saved"
            })
        }
        res.json(user);
    })
}

//user sign out
exports.signout = (req,res) => {
    res.clearCookie("token")
    res.json({
        message: "user signout successfully"
    });
};

//createSignIn
exports.signin = (req,res)=>{
    const {email, password} = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    User.findOne({email}, (err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "USER does not exist"
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Credentials do not match"
            })
        }
        //create token
        const secret = process.env.SECRET;
        const token = jwt.sign({_id: user._id}, secret )
        //put token in cookie
        res.cookie("token", token, {expire: new Date() + 9999});
        //send response to front end
        const {_id, name, email, role} = user;
        return res.json({token,user: {_id,name,email,role}})
    });
};


//protected routes

const secret = process.env.SECRET;

exports.isSignedIn = expressJwt({
    secret: secret,
    algorithms: ['HS256'],
    userProperty: 'auth'
});

//custom middleware

//cheker - whether user is authenticated or not
//if the user is logged in req.profile property is set up from front end
//if req.auth is set up from issignedin middleware
//sign in profile id is equal to auth id so the user can change stuf in his own account
exports.isAuthenticated = (req,res, next)=>{
    let checker = req.profile && req.auth && req.profile._id == req.auth._id ;
    if(!checker){
        return res.status(403).json({
            err : "Access denied"
        })
    }
    next();
}


exports.isAdmin = (req,res, next)=>{
    if(!req.profile.role === 45){
        return res.status(403).json({
            error: "Access invalid. Admin only"
        })
    }
    next();
}

//is seller
exports.isUser = (req,res,next) => {
    if(req.profile.role === 1){
        return res.status(403).json({
            error : "Access invalid. User Only"
        })
    }
    next();
}


exports.isUserExist = (req,res,next) =>{
    const email = req.body.email;
    if(User.findOne({email})){
        return res.status(403).json({
            error: `user exists with this email : ${email}`
        })
    }
}



// //is seller
// exports.isSeller = (req,res,next) => {
//     if(req.profile.role === 0){
//         return res.status(403).json({
//             error : "Access invalid. Seller Only"
//         })
//     }
//     next();
// }