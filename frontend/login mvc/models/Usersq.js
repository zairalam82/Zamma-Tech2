const {DataTypes}=require("sequelize");
const sequelize=require("../../../config/sequelize");

const User=sequelize.define(
    "User",
    {
        user_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        user_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        role:{
            type:DataTypes.STRING
        }
    },
    {
        tableName:"users",
        timestamps:false
    }
);
console.log("Usersq.js loaded");
console.log(User);
module.exports=User;