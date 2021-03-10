
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
//create

const createCategory = (req,res)=>{
    const category = new Category(req.body)
    category.save((err,category)=>{
        if(err){
            res.status(400).json({
                err: "Not able to save category in DB"
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

module.exports = {
    getCategoryById,
    createCategory,
    getAllCategory,
    getCategory,
    updateCategory,
    deleteCategory
}