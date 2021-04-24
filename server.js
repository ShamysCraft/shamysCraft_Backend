//todo: import packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

//todo: import routes
const authRoutes = require("./routes/auth.route") 
const userRoutes = require("./routes/user.route")
const prodRoutes = require("./routes/product.route")
const categoryRoutes = require("./routes/category.route")
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
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', prodRoutes)
// app.use('/api', prodRoutes);

//todo: spin up server 
const port = process.env.PORT
app.listen(port,()=>{
    if(!port) return console.log("Couild not connect to server"); //guardian clause
    console.log(`server is running on http://localhost:${5000}`)
})
