const Product = require("../models/product");
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

//getProductById
const getProductById = (req, res, next, id) => {
    Product.findById(id)
        .populate("category")
        .exec((err,data)=>{
            if(err || !data){
                return res.status(400).json({err: 'product not found'})
            }
            req.Productdata = data;
            next();
        });
        

}

const createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
      //destructure the fields
    //   const { name, description, price, category, stock } = fields;
    const { prodname, description, price, height, width, length, weight, quantity, category } = fields;
      if (!prodname || !description || !price || !height || !width || !length || !weight || ! quantity || !category || !quantity) {
        return res.status(400).json({
          error: "Please include all fields"
        });
      }

      let product = new Product(fields);
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        try {
            product.photo.data = fs.readFileSync(file.photo.path);
            
            product.photo.contentType = file.photo.type;
        } catch (error) {
            return res.status(400).json({
                error: "Cannot set property 'data' of undefined"
            })
        }
      }
      // console.log(product);
  
      //save to the DB
      product.save((err, product) => {
        if (err) {
          res.status(400).json({
            error: "Saving tshirt in DB failed"
          });
        }
        res.json(product);
      });
    });
  };
  

// getProducts
const getProducts = (req, res) => {
    
        Product.find()
                .then(data=> res.json(data))
                .catch(error => res.status(400).json({ error: "cannot retrieve products" }) )
}

const deleteProduct = (req,res) =>{
    const id = req.Productdata._id;
    try {
        Product.findByIdAndDelete(id)
            .then(res.status(200).json({message: "Product deleted successfully"}))
            .catch(err => res.status(400).json({err: `product with ${id} cannot be deleted`}))
    } catch (error) {
        error => res.status(400).json({ error: "cannot process the request" }) 
    }
    
}

const availability = (req, res) => {
    //displayProductavailability
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(400).json("Product does not exist")
        }
        const stock = product.stock;
        if (stock < 1) {
            return res.json("Product is out of stock")
        }
    })
}

module.exports = { getProductById, createProduct, getProducts , deleteProduct }