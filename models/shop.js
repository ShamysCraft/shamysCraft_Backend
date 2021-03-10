const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema;
const schema = mongoose.Schema;
const shopSchema = new schema({
    shopName : {
        type : String,
        required :true
    },
    rating : {
        type :Number
    },
    description : {
        type :String,
        required : true
    },
    image:{
        type: Buffer
    },

    seller : {
        type : ObjectId,
        ref : "User"
    }
},
{
    timestamps : true
})

const shop = mongoose.model("shopSchema", shopSchema);
module.exports = shop;


