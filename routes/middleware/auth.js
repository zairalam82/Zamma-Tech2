const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {

    console.log("cookies:",req.cookies);
const token=req.cookies.token;
console.log("Toke:",token);

    // Step 3: Check if token exists
    if (!token) {
        return res.status(401).json({
            message: "No token provided."
        });
    }

    // Step 4: Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            return res.status(403).json({
                message: "Invalid or expired token."
            });
        }

        // Step 5: Save user information in req.user
        req.user = decoded;

        // Step 6: Continue to the next middleware or route
        next();

    });

};

module.exports = authenticateToken;