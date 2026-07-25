
const db=require("../../../config/db");

exports.findUser=( email,role,callback )=>{

const sql="select *from users where email=? AND role=?";
db.query(sql,[email,role],(err,result)=>{
    if(err){
        return callback(err,null);
    }
    callback(null,result);
})
};