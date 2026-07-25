const loginModel=require("../models/loginModel")
const bcrypt=require("bcrypt") //password ko hash krne k liye uski library use ki hy
const jwt=require("jsonwebtoken");



exports.login=(userData,callback)=>{

const {email,password,role}=userData;
loginModel.findUser(email,role,(err,results)=>{
    if(err){
        

        return callback(err,null);
    }
    if(results.length===0){
       
        return callback({message:"Invalid email or role"},
            null
        );
    }

    const user=results[0];
    bcrypt.compare(password,user.password,(err,isMatch)=>{
        if(err){
            return callback(err,null);
        }
        if(!isMatch){
            return callback({message:"Invalid email or password"},null);
        }
        try{
            const token=jwt.sign({
                user_id:user.user_id,
                role:user.role},
                process.env.JWT_SECRET,
                {expiresIn:"1d"}

            );

            callback(null,{
                token,user
            });
        }catch(err){
            callback(err,null);
        }
    });
});
};
