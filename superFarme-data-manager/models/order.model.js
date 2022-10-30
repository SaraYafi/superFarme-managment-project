const mongoose = require("mongoose");

const ProductInOrder = mongoose.Schema({
    name: String,
    description:String,
    content:String,
    price: Number,
    company:String,
    productionDate: { type: Date, default: Date.now() },
    isFragile: Boolean,
    qty:Number,
});


const orderSchema = mongoose.Schema({
    cart: [ProductInOrder],
    details: {
        name: String,
        orderDate: Date,
        destDate: Date,
        userId: {type:mongoose.Schema.Types.ObjectId,
            ref:"user"},
        city: String,
        street:String,
        numHouse:String
    }
});

const Order = new mongoose.model("order", orderSchema);
module.exports = Order;