const express = require('express');
const db = require('../config/db'); //database sy data lene k liye for checking the data in a database we use this
const router = express.Router();
const authenticateToken=require("./middleware/auth");

//Wishlist post 
router.post("/",authenticateToken, (req, res) => {
    const user_id=req.user.user_id;
    const {product_id}=req.body;

    const checksql =
        `select *from wishlist
         where user_id=?
         and product_id=?`;
   
   

    db.query(checksql, [user_id, product_id], (err, result) => {
        if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: err.sqlMessage
                    });
                }
        if (result.length > 0) {
            return res.status(400).json({
                message: "Product is already in wishlist."
            });
        } 


            const sql = `insert into wishlist(user_id,product_id) values (?,?)`;

            db.query(sql, [user_id, product_id], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: err.sqlMessage
                    });
                }
                res.status(201).json({
                    message: "product added successfully!",
                })
            })
        
    });
})

//Get wishlist


router.get("/:user_id",authenticateToken,(req,res)=>{ //nobody can view the list without logiing it
const {user_id}=req.params;
const sql=`
select products.product_id,products.product_name,products.price,products.image_url
from wishlist 
join products
on products.product_id=wishlist.product_id
where wishlist.user_id=?
`
db.query(sql,[user_id],(err,result)=>{
    if(err){
        console.log(err)
        return res.status(500).json({message:err.sqlMessage});
    }
    res.status(200).json(result);
})

});
//Delete an item from a wishlist
router.delete('/:user_id/:product_id',authenticateToken,(req,res)=>{
    const {user_id,product_id}=req.params;
    const sql=`delete from wishlist
    where user_id=?
    and product_id=?`;
   
    db.query(sql,[user_id,product_id],(err,result)=>{
       if(err){ 
        console.log(err)
        return res.status(500).json({message:err.sqlMessage})
    }
    //check if any row was deleted ye agar use nhe karen gay to wihlist jb empty hoga tab bhi show hoga product remove from the wishlist jabkay hun ne remove nhe keya hoga
    if(result.affectedRows===0){
        return res.status(404).json({
            message:"product not found in wishlist."
        });
    }
    
    res.status(200).json({
        message:"product removed from wishlist."
    })

    })



})



module.exports = router; //main index.js me import karen gay