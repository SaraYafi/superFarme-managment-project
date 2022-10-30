const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: String,
    description:String,
    content:String,
    price: Number,
    company:String,
    productionDate: { type: Date, default: Date.now() },
    isFragile: Boolean,
    img:String,
});

const Product = new mongoose.model("products", productSchema);
module.exports = Product;