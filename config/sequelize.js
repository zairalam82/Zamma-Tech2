const {Sequelize}=require("sequelize");

const sequelize=new Sequelize(
    "zammatech",
    "root",
    "8126",
    {
        host:"localhost",
        dialect:"mysql"
    }
);

module.exports=sequelize;