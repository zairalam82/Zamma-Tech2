const loginService=require("../services/loginService"); //ye wala import kr raha hy serivice ko

exports.login=(req,res)=>{

loginService.login(req.body,(err,result)=>{
    if(err){
         
        return res.status(500).json({message:"Something went wrong"});
    }
   
    res.cookie("token",result.token,{
        httpOnly:true,
        sameSite:"lax",
        maxAge:30*60*1000
    });

    res.status(200).json({
        message:"Login successful",
        token:result.token,
        user:result.user
    });
});

};

