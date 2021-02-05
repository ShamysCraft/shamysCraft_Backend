const product = require("../models/product");
const Product = require("../models/product");

//getProductById
const getProductById = (req,res,next,id) => {
    Product.findById(id)
            .then(data => {
                req.Productdata = data;
                next();
            })
            .catch(err => res.status(400).json(err));
    
}
//createProduc
const createProduct = (req,res) => {
    const data = req.body;
    const product = new Product(data);

    product.save((err, product) => {
        if(err){
            res.status(400).json({
                err : "Product is not saved"
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

//updateProduct

//deleteProduct

module.exports = {getProductById, createProduct, getProducts}