const express = require('express');
const db = require('../config/db');
const router = express.Router();
const authenticateToken = require('./middleware/auth');


//post route
router.post('/', authenticateToken, (req, res) => {
const user_id = req.user.user_id;

const { product_id, quantity } = req.body;
const checkSql = 'SELECT * FROM cart WHERE user_id=? AND product_id=?';
db.query(checkSql, [user_id, product_id], (err, result) => {
if (err) {
return res.status(500).json({ message: err.sqlMessage });
}

if (result.length > 0) {
const updateSql = 'UPDATE cart SET quantity = quantity + ? WHERE user_id=? AND product_id=?';

db.query(updateSql, [quantity, user_id, product_id], (err) => {
if (err) {
return res.status(500).json({ message: err.sqlMessage });
}
res.status(200).json({ message: 'Cart quantity updated!' });
});

} else {
const insertSql = 'INSERT INTO cart(user_id, product_id, quantity) VALUES(?,?,?)';
db.query(insertSql, [user_id, product_id, quantity], (err) => {
if (err) {
return res.status(500).json({ message: err.sqlMessage });
}
res.status(201).json({ message: 'Product added to cart!' });
});
}

});

});

//Get route
router.get('/',authenticateToken,(req,res)=>{
    const user_id=req.user.user_id;
    const sql=`select products.product_id,products.product_name,
    products.price,products.image_url,cart.quantity
    from cart
    join products
    on cart.product_id=products.product_id
    where cart.user_id=?`

    db.query(sql,[user_id],(err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).json({message:err.sqlMessage});
        }
        res.status(200).json(result);
    })
    
})

//delete route

router.delete('/:product_id',authenticateToken,(req,res)=>{
    const user_id=req.user.user_id;
    const product_id=req.params.product_id;
    const sql=`delete from cart
          where user_id=? AND product_id=?`
    db.query(sql,[user_id,product_id],(err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).json({message:err.sqlMessage});
        }
        if(result.affectedRows===0){
            return res.status(404).json({
                message:"product not found in cart"
            });
        }
        res.status(200).json({message:"product removed from cart."});
    })
})

//put mean update route

router.put('/:product_id',authenticateToken,(req,res)=>{
    const user_id=req.user.user_id;
    const product_id=req.params.product_id;
    const {quantity}=req.body;
    const sql=`update cart
          set quantity=?
          where user_id=?
          AND product_id=?`

db.query(sql,[quantity,user_id,product_id],(err,result)=>{
if(err){
    return res.status(500).json({message:err.sqlMessage});
}
if(result.affectedRows===0){
    return res.status(404).json({message:"product not found in cart"});    
}
res.status(200).json({message:"cart updated successfully."});
})

})

module.exports = router;