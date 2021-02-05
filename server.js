//todo: import packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

//todo: import routes
const authroutes = require("./routes/auth.route") 
const prodRoute = require("./routes/product.route")
//todo: init express app
const app = express();

//todo: mongodb connection
const uri = process.env.URI;
mongoose.connect(uri, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log("DB connection successful"))
.catch(err => console.log(`DB Connection failed: ${err}`))

//todo: config middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//todo: router middlewares
app.use('/api', authroutes)
app.use('/api', prodRoute)

//todo: spin up server 
const port = process.env.PORT
app.listen(port,()=>{
    if(!port) return console.log("Couild not connect to server"); //guardian clause
    console.log(`server is running on http://localhost:${5000}`)
})
