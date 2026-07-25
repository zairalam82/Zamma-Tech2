const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all orders
router.get('/', (req, res) => {
    const sql = `SELECT orders.order_id, users.user_name, orders.total_price, 
                orders.status, orders.created_at 
                FROM orders 
                JOIN users 
                ON orders.user_id = users.user_id`;
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong', error: err });
        } else {
            res.status(200).json(results);
        }
    });
});

// PLACE a new order
router.post('/', (req, res) => {
    const { user_id, total_price, items } = req.body;
    
    // First insert into orders table
    const orderSql = 'INSERT INTO orders (user_id, total_price) VALUES (?,?)';
    db.query(orderSql, [user_id, total_price], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong', error: err });
        } else {
            const order_id = result.insertId;

            // Then insert each item into order_items table
            const itemSql = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?';
            const itemValues = items.map(item => [order_id, item.product_id, item.quantity, item.price]);
            
            db.query(itemSql, [itemValues], (err2, result2) => {
                if (err2) {
                    res.status(500).json({ message: 'Something went wrong', error: err2 });
                } else {
                    res.status(201).json({ message: '✅ Order placed successfully!', order_id });
                }
            });
        }
    });
});

// GET orders by user
router.get('/user/:user_id', (req, res) => {
    const sql = `SELECT orders.order_id, orders.total_price, orders.status, 
                orders.created_at, order_items.product_id, 
                order_items.quantity, order_items.price 
                FROM orders 
                JOIN order_items ON orders.order_id = order_items.order_id 
                WHERE orders.user_id = ?`;
    db.query(sql, [req.params.user_id], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong', error: err });
        } else {
            res.status(200).json(results);
        }
    });
});

module.exports = router;
