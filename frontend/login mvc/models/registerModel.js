const db=require("../../../config/db");


exports.createUser=(
    user_name,
    email,
    hashedPassword,
    role,
    callback
)=>{
const sql='INSERT INTO users(user_name,email,password,role) VALUES(?,?,?,?)';
 db.query(sql,[user_name,email,hashedPassword,role],(err,results)=>{
    if(err){
        return callback (err,null);
    }else{
        callback(null,results)
    }
 }
 );
    
};
    
    
