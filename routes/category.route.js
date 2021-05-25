const router = require("express").Router()
const { check } = require('express-validator');

const {
    getCategoryById,
    createCategory,
    getCategory, 
    getAllCategory, 
    updateCategory, 
    deleteCategory,
    getCategoryCount,
    isCategoryExist} = require("../controllers/category.controller")

const {isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth.controller")
const {getUserById} = require("../controllers/user.controller");

//get user id and populate in relevant fields
router.param("userId", getUserById);
router.param("categoryId",getCategoryById);

//a admin can create category
router.post("/category/create/:userId",
[check("Name", "Please enter the category name!").not().isEmpty()],
    isSignedIn,
    isAuthenticated,
    isAdmin,
    isCategoryExist,
    createCategory)
//read category
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

router.get("/getCategoryCount/:userId",isSignedIn,isAuthenticated,isAdmin,getCategoryCount)


module.exports = router;