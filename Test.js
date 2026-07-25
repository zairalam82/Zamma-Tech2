require("dotenv").config();

const jwt = require("jsonwebtoken");

console.log("JWT_SECRET =", process.env.JWT_SECRET);

const token = jwt.sign(
    { id: 1 },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
);

console.log("Generated Token:");
console.log(token);