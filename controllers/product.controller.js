const Product = require("../models/product");
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs");
const { sortBy } = require("lodash");

//getProductById
const getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, data) => {
      if (err || !data) {
        return res.status(400).json({ err: 'product not found' })
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
    const { prodname, description, price, quantity, category } = fields;
    if (!prodname || !description || !price || !quantity || !category ) {
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
          error: "Saving Item in DB failed"
        });
      }
      res.json(product);
    });
  });
};


const getProduct = (req, res) => {

  req.Productdata.photo = undefined;
  res.json(req.Productdata)
}

//middleware - performance optimization
// as photo takes a bit of time to load
const photo = (req, res, next) => {
  if (req.Productdata.photo.data) {
    res.set("Content-Type", req.Productdata.photo.contentType)
    return res.send(req.Productdata.photo.data)
  }
  next();
}

//deleteProduct
const deleteProduct = (req, res) => {
  let product = req.Productdata;

  product.remove((err,deletedProduct)=>{
    if(err){
      return res.status(400).json({err: 'Product deletion failed'})
    }
    res.json({
      message: "Product Deleted Successfully",
      deletedProduct
    })
  })

}

//update product
//adding a product ui == same fields for updation of product

const updateProduct = (req,res)=>{
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    //update code
    let product = req.Productdata;
    product = _.extend(product, fields)

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
          error: "updating of product in DB failed"
        });
      }
      res.json(product);
    });
  });
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

//product listing
const getAllProducts = (req,res)=>{
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products)=>{
      if(err){
        return res.status(400).json({
          error: "No products found!"
        });
      }
      res.json(products)
    });

}

const getAllUniqueCategories = (req,res)=>{
  Product.distinct("Category",{}, (err,category)=>{
    if(err){
      return res.status(400).json({
        error: "Categories are not found"
      })
    }
    res.json(category)
  })
}

//update quantity and sold
//middleware
const updateStock = (req,res,next)=>{
  let myOperations = req.body.order.products.map(prod => {
    return {
      updateOne: {
        filter : {_id: prod._id},
        update: {$inc: {quantity: -prod.count, sold: +prod.count}}
      }
    } 
  })
  Product.bulkWrite(myOperations, {}, (err, products)=>{
    if(err){
      return res.status(400).json({
        error: "bulk operation failed"
      })
    }
    next();

  });
}

// getProducts - testing purpose
const getProducts = (req, res) => {

  Product.find()
    .then(data => res.json(data))
    .catch(error => res.status(400).json({ error: "cannot retrieve products" }))
}



module.exports = { getProductById, createProduct, getProducts, getProduct, deleteProduct ,photo, updateProduct, getAllProducts, getAllUniqueCategories, updateStock }