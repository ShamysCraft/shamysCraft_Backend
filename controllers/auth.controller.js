//import validator
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require("express-jwt")
//import user model
const User = require("../models/user");

//getUserbyid
exports.getUserById = (req,res,next,id) => {
    User.findById(id)
        .then(data => {
            req.Userdata = data;
            next();
        })
        .catch(err => res.status(400).json(err))
        
}

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
        const token = jwt.sign({_id: user._id}, process.env.SECRET )
        //put token in cookie
        res.cookie("token", token, {expire: new Date() + 9999});
        //send response to front end
        const {_id, name, email, role} = user;
        return res.json({token,user: {_id,name,email,role}})
    });
};

//protected routes
//custom middleware

// module.exports. = {
//     getUserById,
//     signup,
//     signin,
//     signout,
    
// }


exports.isSignedIn = expressJwt({
    secret: 'secret',
    algorithms: ['HS256'],
    userProperty: 'auth'
});