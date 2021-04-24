// const Shop = require("../models/shop");
// const User = require("../models/user");
// const Product = require("../models/product")
// const Order = require("../models/order");

// //  getShopbyId(id, next)
// const getShopById = (req,res,next,id)=>{
//     Shop.getShopById(id).exec((err,shop)=>{
//         if(err){
//             res.status(400).json(err)
//         }
//         req.shopprofile = shop;
//         next();
//     })
// }


// //  getSeller(id, next)
// const getUserById = (req,res,next,id)=>{
//     User.getShopById(id).exec((err,user)=>{
//         if(err || !user){res.status(400).json(err)}
//         req.profile = user;
//         next();
//     })
    
// }
    
// //  updateShop()

// //  confirmOrder()

// //get productId
// const confirmOrder = (req,res)=>{
    
// }
// //getProductsbyshopId

// module.exports = {
//     getShopById,
//     getUserById,
//     // getSeller,
//     // updateShop,
//     // getSales,
//     confirmOrder
// }