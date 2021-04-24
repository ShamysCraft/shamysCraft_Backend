const Product = require("../models/product");
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

//getProductById
const getProductById = (req,res,next,id) => {
    Product.findById(id)
            .populate("category")
            .populate("shop")
            .then(data => {
                req.Productdata = data;
                next();
            })
            .catch(err => res.status(400).json(err));
    
}
//createProduc
const createProduct = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file)=>{
        if(err){
            return res.status(400).json({
                error: "Error with image"
            });
        };

        //destructure the fields
        const {prodname, description, price, height, width, length, weight, quantity, category,shop} = fields;
        if(
            !prodname ||
            !description ||
            !price ||
            !height ||
            !width || 
            !length ||
            !weight ||
            !quantity ||
            !category ||
            !shop
        ){
            return res.status(400).json({
                err : "Please include all fields"
            })
        }
        
        //handle file
        let product = new Product(fields);
        //handle file here
        if(file.photo){
            if(file.photo.size> 3000000){
                return res.status(400).json({
                    error : "File size too big"
                });
            }
            //saves photo db
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
    })

    //todo restrictions on fields
    
    product.save((err, product) => {
        if(err){
            res.status(400).json({
                err : "Product is not saved",
            })
        }

        res.json(product);
    })
}
//getProducts
const getProducts = (req,res) => {
    product.find().exec((err,data) =>{
        if(err){
            res.status(400).json({ err : "cannot retrieve products"})
        }
        res.json(data);
    })
            
}

// const getProductByShopId = (req,res)=>{
//     // const shopId;
//     Product.find({shopId : shopId})
//         .then()
//         .catch()
// }

// //deleteProduct
// const deleteProduct = (req,res)=>{
//     Product.findByIdAndDelete(id).exec(err,product)
// }

const availability= (req,res)=>{
    //displayProductavailability
    Product.findById(id).exec((err,product)=>{
    if(err || !product){
        return res.status(400).json("Product does not exist")
    }
    const stock = product.stock;
    if (stock<1){
            return res.json("Product is out of stock")
    }
})
}

module.exports = {getProductById, createProduct, getProducts}