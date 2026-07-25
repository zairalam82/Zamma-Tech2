const bcrypt=require("bcrypt");

const registerModel=require("../models/registerModel");


exports.register=(userData,callback)=>{
    const {user_name,email,password,role}=userData;
     
    bcrypt.hash(password,10,(err,hashedPassword)=>{
        if(err){
            console.log(err);
            return;
        }
    //after hashing the password user will create and saved into database
    registerModel.createUser(
        user_name,
        email,
        hashedPassword,
        role,
        (err,results)=>{
            if(err){
                return useCallback(err,null);
            }else{
                callback(null,results);
            }
        }
    );    
    })
}