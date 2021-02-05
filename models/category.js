const {Schema, model} = require("mongoose");

const categoryScheme = new mongoose.Schema({
    Name : {
        type : String,
        trim : true,
        required: true,
        maxlength : 32,
        unique: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Category", categoryScheme);
