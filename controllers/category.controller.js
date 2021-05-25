const { body, validationResult } = require('express-validator');

const Category = require("../models/category");

//CategoryById
const getCategoryById = (req,res,next,id) => {
    Category.findById(id).exec((err,category)=>{
        if(err || !category){
            res.status(400).json({
                err: "Category is not found"
            })
        }
        req.category = category
        next()
    })
    
}

//create category
const createCategory = (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        })
    }
    const category = new Category(req.body)
    category.save((err,category)=>{
        if(err){
            res.status(400).json({
                err: "Failed to save Category "
            })
        }
        res.json(category)
    });
};

//Read all Category
const getAllCategory = (req,res) => {
     Category.find().exec((err,categories)=>{
         if(err){
             res.status(400).json({
                 err: "No categories were found"
             })
         }
         res.json(categories)
     })
}

const getCategory = (req,res) => {
    return res.json(req.category)
}

//update
//from the middleware u can grab the category
 //data grabbed from front end
const updateCategory = (req,res) => {
    const category = req.category;
    category.Name = req.body.Name;
    category.save((err, updatedCategory)=>{
        if(err){
            return res.status(400).json({
                err: "failed to update category"
            })
        }
        res.json(updatedCategory)
    });

}
//Remove
const deleteCategory = (req,res) => {
    //data coming from middleware
    //extracting from parameter
    const category = req.category

    category.remove((err,category)=>{
        if(err){
            res.status(400).json({err: `failed to delete category ${category}` })
        }
        res.json({
            message: `successfully deleted ${category}`
        })
    })
}

// avoid duplicate category names being produced
// isCategoryExist middleware
const isCategoryExist = (req,res,next) => {
    const catName = req.body.Name;
    Category.findOne({Name : catName})
    .then(category=>{
        if(category){
            res.status(403).json({error: 'Category already exists'});
        }
        else{
            next()
        }
    })
    
    
}

const getCategoryCount = (req,res) =>{
    Category.countDocuments({} , (err,category)=>{
        if(err){
            res.status(400).json(err)
        }else{
            res.json(category)
        }
    })
            
        
  }

module.exports = {
    getCategoryById,
    createCategory,
    getAllCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    isCategoryExist,
    getCategoryCount
}