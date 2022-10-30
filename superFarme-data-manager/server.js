const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");
const orderRoute = require("./routes/order");

const printProduct=(req,res,next)=>{
    console.log("from product");
    next();
}

const app=express();
app.use(express.json());
app.use(cors());
app.use("/product",printProduct)
app.use("/product",productRoute);
app.use("/user",userRoute);
app.use("/order",orderRoute);


mongoose.connect("mongodb://localhost:27017/superFarm").then(o=>console.log("connected"));
app.listen(5002,()=>{
    console.log("listening");
});