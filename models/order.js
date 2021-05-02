const {Schema, model} = require("mongoose");
const {ObjectId} = Schema;

const ProductcartSchema = new Schema({
    productId : {
        type : ObjectId,
        ref : "Product"
    },

    name: String,
    count: Number,
    price: Number,

    userId : {
        type : ObjectId,
        ref : "User"
    },
    availability:String,
},{
    timestamps: true
});

const ProductCart = model("ProductCart", ProductcartSchema);


const OrderSchema = new Schema({
    products : [ProductcartSchema],
    transaction_id: {},
    quantity : {type: Number},
    amount : {type: Number},
    status: {
        type: String,
        default: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"],

    },
    address: String, 
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