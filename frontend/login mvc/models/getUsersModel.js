
const User=require("./Usersq");

exports.getAllUsers=async()=>{
    return await User.findAll({
        attributes:[   //no sql we write it by using sequelize
            "user_id", 
            "user_name",
            "email",
            "role",
            "created_at"
        ]
    });
};

/*
its for without sequelize
const sequelize = require("../../../config/sequelize");
exports.getAllUsers=(callback)=>{

const sql='select user_id,user_name,email,role,created_at from users';
db.query(sql,(err,results)=>{
    if(err){
        return callback(err,null);
    }else{
        return callback(null,results);
    }
})


}

*/ 