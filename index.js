require("dotenv").config();

const sequelize=require("./config/sequelize");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "frontend")));

app.use("/images", express.static(path.join(__dirname, "frontend/images")));

const userRoutes=require('./routes/users');
const productRoutes=require('./routes/products');
const orderRoutes = require('./routes/orders');
const wishlistRoutes=require('./routes/wishlist'); 
const cartRoutes=require('./routes/cart');
//add for api use

app.use('/api/users',userRoutes);
app.use('/api/products',productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist',wishlistRoutes);
app.use("/api/cart",cartRoutes);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

//The below code is for the sequelize connnection
async function connetSequelize(){
    try{
        await sequelize.authenticate();
        console.log("Sequelize conneted successfully");
    }catch(error){
     console.log(error);
    }
}

connetSequelize(); //yahan tk

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`Server running on http:/localhost: ${PORT}`);
});
