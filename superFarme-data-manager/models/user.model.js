const mongoose = require("mongoose");



const userSchema = mongoose.Schema({
    name: String,
    password:String,
    mail:String,
    position: Number,
    street:String,
    city: String,
    numHouse:Number,
    phone:String,
});

const User = new mongoose.model("user", userSchema);
module.exports = User;