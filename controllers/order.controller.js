const { sortBy } = require("lodash");
const { Order, ProductCart } = require("../models/order")
const getOrderById = (req, res, next, id) => {
    Order.findById(id)
        .populate("products.product", "prodname price")
        .exec((err, order) => {
            if (err) {
                res.status(400).json({
                    error: "Order does not exist"
                })
            }
            req.order = order;
            next();
        })
}

// create order
const createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const orderData = req.body.order;
    const order = new Order(orderData);
    order.save((err,order)=>{
        if(err){
            res.status(400).json({
                error: "Order cannot be saved in the DB"
            })
        }
        res.json(order)
    });
}

// read order
const getAllOrders = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit)  : 10
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Order.find()
        .populate("user", "_id fname")
        .limit(limit)
        .sort([[sortBy, "asc"]])
        .then(data => res.json(data))
        .catch(error => res.status(400).json({ message: "cannot retrieve orders" }))
    
}

//status of order
const getOrderStatus = (req,res)=>{
    res.json(Order.schema.path("status").enumValues)
}
const updateStatus = (req,res)=>{
    const id = req.body.orderId;
    const status = req.body.status;
    Order.update(
        {_id: id},
        {$set: {status: status}},
        ((err,order)=>{
            if(err){
                res.status(400).json({
                    error: "Order cannot be updated"
                })
            }
            res.json(order) 
        })
    )
}

module.exports =
{
    getOrderById,
    createOrder,
    getAllOrders,
    getOrderStatus,
    updateStatus
}