const router = require("express").Router();

const {createProduct, getProductById, getProducts} = require("../controllers/product.controller")
const {isSignedIn,isAuthenticated,isSeller,isAdmin} = require("../controllers/auth.controller")
const {getShopById} = require("../controllers/shop.controller")
const {getCategoryById} = require("../controllers/category.controller")
const {getUserById} = require("../controllers/user.controller")

//param user
router.param("userId", getUserById)
//param
router.param("productId", getProductById);
//param shop id
router.param("shopId", getShopById)
//param category is
router.param("categoryId", getCategoryById)

// //getProductbyid
router.get("/product")

//createProduct
router.post("/product/creat/:userId/:shopId",
    isSignedIn,
    isAuthenticated,
    isSeller, 
    createProduct);

//getProducts
router.get("/product", getProducts);

module.exports = router;