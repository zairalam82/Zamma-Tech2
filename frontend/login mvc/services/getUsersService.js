
const usersModel=require("../models/getUsersModel");

exports.getAllUsers= async()=>{
    return await usersModel.getAllUsers();
}