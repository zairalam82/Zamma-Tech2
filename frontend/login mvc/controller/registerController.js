const registerService = require("../services/registerService");

exports.register = (req, res) => {

    registerService.register(req.body, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Something went wrong"
            });
        }

        res.status(201).json({
            message: "User registered successfully",
            userId: results.insertId
        });

    });

};