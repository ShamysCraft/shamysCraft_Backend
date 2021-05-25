const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const ProductcartSchema = new mongoose.Schema({
    productId : {
        type : ObjectId,
        ref : "Product"
    },

    prodname: String,
    count: Number,
    price: Number,

},{
    timestamps: true
});

const ProductCart = mongoose.model("ProductCart", ProductcartSchema);


const OrderSchema = new mongoose.Schema({
    products : [ProductcartSchema],
    transaction_id: {},
    amount : {type: Number},
    address: String, 
    status: {
        type: String,
        default: "Received",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"],

    },
    updated: Date,
    user: {
        type : ObjectId,
        ref : "User"
    },

},{
    timestamps: true
})

const Order = mongoose.model("Order", OrderSchema);
module.exports = {Order, ProductCart};