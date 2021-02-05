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
    availability:String
},{
    timestamps: true
});

module.exports = model("ProductCart", ProductcartSchema);


const OrderSchema = new Schema({
    products : [ProductcartSchema],
    transaction_id: {},
    shop : {
        type : ObjectId,
        ref : "Shop"
    },
    user: {
        type : ObjectId,
        ref : "User"
    },
    quantity : {type: Number},
    amount : {type: Number},
    buyerconfirm : {type : Boolean},
    sellercofirm : {type : Boolean},
    address: String

},{
    timestamps: true
})

module.exports = model("Order", OrderSchema);
