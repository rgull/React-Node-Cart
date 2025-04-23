const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const userSignup = async (req, res) => {
    try {
        const {  name, email, password } = req.body;
console.log(req.body)
        // Validate required fields
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        // Hash password
        const hashpPassword = await bcrypt.hash(password, 10);
        if (!hashpPassword) {
            return res.status(500).json({ message: "Something went wrong while hashing the password" });
        }

        // Check if user already exists
        const user = await userModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashpPassword
        };

        const userData = new userModel(payload);
        const saveUserdata = await userData.save();

        // Success response
        res.json({
            data: saveUserdata,
            success: true,
            error: false,
            message: "User Created Successfully"
        });
        
    } catch (error) {
        // General error handling
        res.status(500).json({
            message: error.message || "Something went wrong",
            error: true,
            success: false
        });
    }
};

module.exports = userSignup;
