const router = require("express").Router()

const {getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, deleteCategory} = require("../controllers/category.controller")
const {isAuthenticated,isAdmin, isSignedIn} = require("../controllers/auth.controller")
const {getUserById} = require("../controllers/user.controller");

//get user id and populate in relevant fields
router.param("userId", getUserById);
router.param("categoryId",getCategoryById);

//a seller can create category
router.post("/category/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCategory)
//read
router.get("/category/:categoryId",getCategory)
router.get("/categories",getAllCategory)
//update
router.put(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateCategory)
//delete
router.delete(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteCategory)

module.exports = router;