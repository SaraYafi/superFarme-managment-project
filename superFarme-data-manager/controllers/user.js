const mongoose = require("mongoose");
const User = require("../models/user.model");
const getAllUser = async (req, res) => {
    try {
        let users = await User.find({});
        res.send(users)
    }
    catch (e) {
        res.status(400).send(e.message)
    }

}
const getUserByPasAndName = async (req, res) => {
    try {
        let pas = req.params.password;
        let name = req.params.name;
        let user = await User.findOne({ "password": pas })
        if (!user||user.name!==name)
            return res.status(404).send("לא נמצא משתמש עם כזה קוד")
        return res.send(user)
    }
    catch (e) {
        res.status(400).send(e.message)
    }

}
const addUser = async (req, res) => {
    try {
        let u = new User({ ...req.body })
        if(await User.findOne({ "password": u.password }))
               return res.status(400).send("החלף סיסמא")
        if(await User.findOne({ "name": u.name })) 
               return res.status(400).send("החלף שם")
               
        let newUser = await u.save();
        return res.send(newUser);
    }

    catch (e) {
        res.status(400).send(e.message)
    }

}
const updateUser = async (req, res) => {
    try {
        let id = req.params.id;
        let user = req.body;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("קוד לא תקין")
        let u = await User.findById(id);
        if (!u)
            return res.status(404).send("לא נמצא משתמש עם כזה קוד");
        u.name =  u.name||user.name ;
        // p.price = book.price == undefined || book.price == null ? b.price : book.price;
        // p.author = book.author || b.author;
        // p.publishDate = book.publishDate || b.publishDate
        await u.save();
        return res.send(u);
    }
    catch (e) {
        res.status(400).send(e.message)
    }

}
const deleteUser = async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("קוד לא תקין")
        let u = await User.findByIdAndDelete(id);
        return res.send(u);
    }
    catch (e) {
        res.status(400).send(e.message)
    }
}


module.exports = {
    getAllUser,
    getUserByPasAndName,
    addUser,
    //deleteUser,
    //updateUser,
}