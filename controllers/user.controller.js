const User = require("../models/user")
const Order = require("../models/order")

// const Shop = require("../models/shop")

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
    const id = req.profile._id;
    User.findByIdAndDelete(id)
        .then(res.json("user deleted"))
        .catch(res.status(404).json({ err: "user cannot be deleted"}))
}

//updateUser
const updateUser =(req,res)=>{
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set: req.body},
        {new: true},
        (err, user) => {
            if(err){
                return res.status(400).json({
                    err : "Not authorised to update user"
                })
            }
            user.salt = undefined;
            user.ency_password = undefined;
            res.json(user);
        }
    )
}

const getUsers = (req,res)=>{
    User.find().exec((err, user)=>{
        if(err){
            res.status(400).json(err)
        }
        return res.json(user);
    })
}

    
//pulling information from order model
//fetching orders based on a user who pushed 
//order using order model
const userPurchaseList = (req,res)=>{
    Order.find({user: req.profile._id})
        .populate("user", "_id fname")
        .exec((err,order)=>{
            if(err){
                res.status(400).json({ err : "No order in this account "})
            }
            return res.json(order);
        })
}

const pushOrderInPurchaseList = (req,res,next)=>{
    let purchases = []
    req.body.order.products.forEach(product =>{
        purchases.push({
            _id: product._id,
            prodname: product.prodname,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    })

    //store this in db
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new:true},
        (err, purchases)=>{
            if(err){
                return res.status(400).json({
                    error:"unable to save purchase list"
                })
            }
            next();
        }
    )
    
}

//addAddress

module.exports = {
    getUserById,
    getUser,
    getUsers,
    updateUser,
    deleteuser,
    userPurchaseList,
    pushOrderInPurchaseList,
}


// //user become a seller
// const confirmSeller = (req,res) => {
//     User.findByIdAndUpdate(
//         {_id : req.profile._id},
//         {$set: req.body},
//         {new: true},
//         (err,user) => {
//             if(err){
//                 return res.status(400).json({
//                     err: "Not Authorised to update the user"
//                 }) 
//             }
//             user.salt = undefined;
//             user.ency_password = undefined,
//             res.json(user)
//         }
//     )
//     }
    //user create shop
    // const createShop = (req,res)=>{
    // const {shopName,description} = req.body;
    // const id = req.profile._id;
    // const shop = new Shop({
    //     shopName : shopName,
    //     description : description,
    //     seller : id
    // })
    // shop.save((err,shop)=>{
    //     if(err){
    //         res.status(400).json({
    //             err, error:"Shop is not created"
    //         })
    //     }
    //     res.json(shop);
    // })
    // }