// authToken.js
const jwt = require('jsonwebtoken');

const authToken = async (req, res, next) => {
    try {
        // Get token from cookies or authorization header
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
      
        if (!token) {
            return res.status(401).json({
                message: "Please login first",
                error: true,
                success: false
            });
        }

        // Verify token
        jwt.verify(token, "123", (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Invalid or expired token",
                    error: true,
                    success: false
                });
            }
            
            // Set user info in request
            req.user = { id: decoded._id };
            next();
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Authentication error",
            error: true,
            success: false
        });
    }
};

module.exports = authToken;


