const {Schema, model} = require("mongoose");
const {ObjectId} = Schema;

const ProductcartSchema = new Schema({
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

const ProductCart = model("ProductCart", ProductcartSchema);


const OrderSchema = new Schema({
    products : [ProductcartSchema],
    transaction_id: {},
    amount : {type: Number},
    address: String, 
    status: {
        type: String,
        default: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"],

    },
    updated: Date,
    user: {
        type : ObjectId,
        ref : "User"
    },

},{
    timestamps: true
})

const Order = model("Order", OrderSchema);
module.exports = {Order, ProductCart};