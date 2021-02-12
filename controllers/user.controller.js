const User = require("../models/user")

const { body, validationResult } = require('express-validator');
const {} = require("../controllers/auth.controller");

//get userById
const getUserById = (req,res,next, id) => {
    User.findById(id).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({ err: "User was not found"})
        }
        req.profile = user;
        next(); 
    })
}

//getUser
const getUser = (req,res)=>{
    req.profile.salt = undefined;
    req.profile.ency_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile)
    
}

 
//deleteuser
const deleteuser = (req,res) => {
    const id = req.body._id;
    User.findByIdAndDelete(id)
        .then(res.json("user deleted"))
        .catch(err => res.status(404).json({ err: "user cannot be deleted"}))
}

//updateUser

module.exports = {
    getUserById,
    getUser,
    
    deleteuser
}