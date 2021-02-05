const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
fname: {
    type: String,
    required: true,
    trim: true
},
lname: {
    type: String,
    required: true,
    trim: true
},
email: {
    type: String,
    required: true,
    trim: true
},
encry_password :{
    type: String,
    required: true,
    trim: true
},

address:[{
    line1:{
        type: String,
    },
    city:{
        type: String,
    },
    district:{
        type:String
    },
    province:{
        type:String
    },
    postalcode:{
        type:Number
    }
}],
phonenumber:{
    type:Number
},
salt:{type: String},
role:{type:Number},
},
{
    timestamps:true
})

//receive plain password 
userSchema.virtual("password")
.set(function(password){
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securepassword(password);
})
.get(function(){
    return this._password;
})
//authenticate and secure password
userSchema.methods = {
    authenticate : function(plaintpassword){
        return this.securepassword(plaintpassword) === this.encry_password;
    },
    securepassword : function(plaintpassword){
        if(!plaintpassword){
            return ""
        }
        try {
            return crypto.createHmac('sha256', this.salt)
                        .update(plaintpassword)
                        .digest('hex');
        } catch (error) {
            return ""
        }
    }
}

const user = mongoose.model("User", userSchema);
// const user = mongoose.model("User", userSchema , [add collection name] )
module.exports = user;