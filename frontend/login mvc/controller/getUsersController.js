const getUsersService=require("../services/getUsersService");

exports.getAllUsers=async(req,res)=>{
 try{
    const users=await getUsersService.getAllUsers();
    res.status(200).json(users);
 }catch(err){
    res.status(500).json({
        message:"Something went wrong",
        error:err.message
    });
 }   
};