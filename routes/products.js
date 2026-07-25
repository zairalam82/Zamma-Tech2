const express = require('express');
const authenticateToken = require("./middleware/auth");
const authorizeAdmin = require("./middleware/admin");
const router = express.Router();
const db = require('../config/db');


// ======================
// GET ALL PRODUCTS
// ======================

router.get('/', (req, res) => {

    const sql = `
        SELECT
            product_id,
            product_name,
            price,
            remaining_stock,
            image_url,
            category_id,
            created_at
        FROM products
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: err.sqlMessage
            });

        }

        res.status(200).json(results);

    });

});


// ======================
// ADD PRODUCT
// ======================

router.post('/', authenticateToken,authorizeAdmin,(req, res) => {

    const {
        product_name,
        price,
        remaining_stock,
        image_url,
        category_id
    } = req.body;

    const sql = `
        INSERT INTO products
        (product_name, price, remaining_stock, image_url, category_id)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            product_name,
            price,
            remaining_stock,
            image_url,
            category_id
        ],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: err.sqlMessage
                });

            }

            res.status(201).json({
                message: "Product added successfully!",
                productId: result.insertId
            });

        }
    );

});


// ======================
// UPDATE PRODUCT
// ======================

router.put('/:id', authenticateToken,authenticateToken,(req, res) => {

    const id = req.params.id;

    const {
        product_name,
        price,
        remaining_stock,
        image_url,
        category_id
    } = req.body;

    const sql = `
        UPDATE products
        SET
        product_name=?,
        price=?,
        remaining_stock=?,
        image_url=?,
        category_id=?
        WHERE product_id=?
    `;

    db.query(
        sql,
        [
            product_name,
            price,
            remaining_stock,
            image_url,
            category_id,
            id
        ],
        (err) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: err.sqlMessage
                });

            }

            res.json({
                message: "Product updated successfully!"
            });

        }
    );

});


// ======================
// DELETE PRODUCT
// ======================

router.delete('/:id', (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM products WHERE product_id=?";

    db.query(sql, [id], (err) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: err.sqlMessage
            });

        }

        res.json({
            message: "Product deleted successfully!"
        });

    });

});


module.exports = router;