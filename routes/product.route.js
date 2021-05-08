const router = require("express").Router();

const {
    getProductById,
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    getAllUniqueCategories,
    photo } = require("../controllers/product.controller")

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth.controller")
const { getCategoryById } = require("../controllers/category.controller")
const { getUserById } = require("../controllers/user.controller")

//param user
router.param("userId", getUserById)
//param
router.param("productId", getProductById);

//param category is
router.param("categoryId", getCategoryById)

//getProductbyId
router.get("/product/:productId", getProduct)
router.get("/product/photo/:productId", photo)

//createProduct
router.post("/product/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createProduct);



//updateProduct
router.put("/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateProduct)

//deleteProduct
router.delete("/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteProduct);


//getProducts
router.get("/product", getProducts);

//listing route
router.get("/products", getAllProducts);

//get categories
router.get("/product/catgories",getAllUniqueCategories)

module.exports = router;