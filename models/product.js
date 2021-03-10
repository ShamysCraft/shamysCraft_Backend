const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const productScheme = new mongoose.Schema({
    prodname : {
        type: String,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    price :{
        type: Number,
        required: true,
        maxlength:32,
        trim: true
    },
    
    height: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    
    weigth: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    shop:{
        type:ObjectId,
        ref: "Shop",
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    photo:{
        type: Buffer,
        contentType: String
    }
   
},{
    timestamps: true
})

// const commentSchema = new mongoose.Schema({
//     user : {
//         type : ObjectId,
//         ref : "User"
//     },
//     product : {
//         type : ObjectId,
//         ref : "Product"
//     },
//     comment: {
//         type : String,
//         required: true
//     }
// },{
//     timestamps: true
// })

const product = mongoose.model("Product", productScheme);
// const comment = mongoose.model("Comment", commentSchema);

module.exports = product;

