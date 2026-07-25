const express=require('express'); //express framework into this file
const router=express.Router(); //create a seprate route manager
const db=require('../config/db'); //import the databae connection here which we were exported
//../ your inside routes go back one folder config hy


//Register a new user
const registerController=require("../frontend/login mvc/controller/registerController");

router.post("/register",registerController.register);

module.exports=router;

//login user
const loginController=require("../frontend/login mvc/controller/loginController");
router.post("/login",loginController.login);
module.exports=router;

//Get all users
const getUsersController=require("../frontend/login mvc/controller/getUsersController");
router.get('/',getUsersController.getAllUsers);
module.exports=router;

//if a user does not logout the cockikes will stay in the browser so that why we have to loggout the cookie
router.post("/logout",(req,res)=>{
    res.clearCookie("token");
    return res.status(200).json({
        message:"Logged out successfully."
    });
});

module.exports=router; //to exposrt this line to index.js (main file).
//Aslo write the 2 line in the main file for import the data from this file