const mongoose = require("mongoose");
const Order = require("../models/Order.model");
const getAllOrder = async (req, res) => {
    try {
        let orders = await Order.find({});
        res.send(orders)
    }
    catch (e) {
        res.status(400).send(e.message)
    }

}
const getOrderById = async (req, res) => {
    try {


        let id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("קוד לא תקין")
        let order = await Order.findOne({ "_id": id })
        if (!order)
            return res.status(404).send("לא נמצא הזמנה עם כזה קוד")
        return res.send(order)

    }
    catch (e) {
        res.status(400).send(e.message)
    }

}
const getOrdersByUserId = async (req, res) => {
    try {
        let userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId))
            return res.status(400).send("קוד לא תקין")
        let orders = await Order.find({ "userCode": userId })
        if (!orders)
            return res.status(404).send("לא נמצא הזמנה עם כזה קוד")
        return res.send(orders)

    }
    catch (e) {
        res.status(400).send(e.message)
    }

}
const getOrdersBetweenTwoDates = async (req, res) => {
    try {
        let dateBefore = req.params.date1;
        let dateAfter = req.params.date2;
        let orders = await Order.find({ "orderDate": {$gt:dateBefore , $lt:dateAfter}} )
        if (!orders)
            return res.status(404).send("לא נמצא הזמנות בין התאריכים")
        return res.send(orders)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
}

const addOrder = async (req, res) => {
    try {
        let o = new Order({ ...req.body })
        let newOrder = await o.save();
        return res.send(newOrder);
    }

    catch (e) {
        res.status(400).send(e.message)
    }

}
const addProductToOrder = async (req, res) => {
    try {
        let id = req.params.id;
        let product=req.body;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("קוד לא תקין")
        let order = await Order.findOne({ "_id": id })
        order.products.push(product);
        let updateOrder = await order.save();
        return res.send(updateOrder);
    }

    catch (e) {
        res.status(400).send(e.message)
    }

}
const updateOrder = async (req, res) => {
    try {
        let id = req.params.id;
        let order = req.body;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("קוד לא תקין")
        let o = await Order.findById(id);
        if (!o)
            return res.status(404).send("לא נמצא מוצר עם כזה קוד");
        o.name =  o.name ||order.name;
        // p.price = book.price == undefined || book.price == null ? b.price : book.price;
        // p.author = book.author || b.author;
        // p.publishDate = book.publishDate || b.publishDate
        await o.save();
        return res.send(o);
    }
    catch (e) {
        res.status(400).send(e.message)
    }

}
const deleteOrder = async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("קוד לא תקין")
        let o = await Order.findByIdAndDelete(id);
        return res.send(o);
    }
    catch (e) {
        res.status(400).send(e.message)
    }
}

const OldOrdersByUserId=async (req, res) => {
    try {
       let orders=getOrderByUserId(req);
       orders=orders.filter(item => {return item.dueDate<=new Date()} );
        return res.send(orders);
    }
    catch (e) {
        res.status(400).send(e.message)
    }
}

module.exports = {
    getAllOrder,
    getOrderById,
    getOrdersByUserId,
    getOrdersBetweenTwoDates,
    addOrder,
    deleteOrder,
    addProductToOrder,
    updateOrder,
    OldOrdersByUserId
}