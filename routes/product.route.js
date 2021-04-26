const router = require("express").Router();

const {
    getProductById,
    createProduct , 
    getProducts} = require("../controllers/product.controller")

const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth.controller")
const {getCategoryById} = require("../controllers/category.controller")
const {getUserById} = require("../controllers/user.controller")

//param user
router.param("userId", getUserById)
//param
router.param("productId", getProductById);

//param category is
router.param("categoryId", getCategoryById)

// //getProductbyid
router.get("/product")

//createProduct
router.post("/product/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createProduct);

//getProducts
router.get("/product", getProducts);

module.exports = router;