const {createProduct, getProductById, getProducts} = require("../controllers/product.controller")
const router = require("express").Router();
//param
router.param("productId", getProductById);

//getProductbyid

//createProduct
router.post("/product", createProduct);

//getProducts
router.get("/product", getProducts);

module.exports = router;