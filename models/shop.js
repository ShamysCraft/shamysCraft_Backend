const mongoose = require("mongoose");
const seller = require("./user")
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
        type : Object,
        ref : seller
    }
},
{
    timestamps : true
})

const shop = mongoose.model("shopScheme", shopSchema);
module.exports = shop;


