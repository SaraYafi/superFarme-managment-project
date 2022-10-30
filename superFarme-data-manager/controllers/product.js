const mongoose = require("mongoose");
const Product = require("../models/product.model");
const getAllProduct = async (req, res) => {
    try {
        let products = await Product.find({});
        res.send(products)
    }
    catch (e) {
        res.status(400).send(e.message)
    }

}
const getProductById = async (req, res) => {
    try {


        let id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("קוד לא תקין")
        let product = await Product.findOne({ "_id": id })
        if (!product)
            return res.status(404).send("לא נמצא מוצר עם כזה קוד")
        return res.send(product)

    }
    catch (e) {
        res.status(400).send(e.message)
    }

}
const addProduct = async (req, res) => {
    try {
        let p = new Product({ ...req.body })
        let newProduct = await p.save();
        return res.send(newProduct);
    }

    catch (e) {
        res.status(400).send(e.message)
    }

}
const updateProduct = async (req, res) => {
    try {
        let id = req.params.id;
        let product = req.body;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("קוד לא תקין")
        let p = await Product.findById(id);
        if (!p)
            return res.status(404).send("לא נמצא מוצר עם כזה קוד");
        p.name = product.name || p.name;
        // p.price = book.price == undefined || book.price == null ? b.price : book.price;
        // p.author = book.author || b.author;
        // p.publishDate = book.publishDate || b.publishDate
        await p.save();
        return res.send(p);
    }
    catch (e) {
        res.status(400).send(e.message)
    }

}
const deleteProduct = async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("קוד לא תקין")
        let p = await Product.findByIdAndDelete(id);
        return res.send(p);
    }
    catch (e) {
        res.status(400).send(e.message)
    }
}
const getProductsByPrice = async (req, res) => {
    try {

        let price = req.params.price;
        const products = await Product.find({ "price": { $lt: price } });
        return res.send(products)

    }
    catch (e) {
        res.status(400).send(e.message)
    }

}
const getProductsByCategory=async(req,res)=>{

try{

    let category = req.params.category;
    const products = await Product.find({ "category": { $lt: category } });
    return res.send(products)

}catch (e) {
        res.status(400).send(e.message)
    }

}
module.exports = {
    getAllProduct,
    getProductById,
    addProduct,
    deleteProduct,
    updateProduct,
    getProductsByPrice,
    getProductsByCategory
}