const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email) {
        return res.status(400).json({
            message: 'Email is required',
            error: true,
            success: false
        });
    }
    
    if (!password) {
        return res.status(400).json({
            message: 'Password is required',
            error: true,
            success: false
        });
    }
    
    const user = await userModel.findOne({ email: email });
    
    if (!user) {
        return res.status(404).json({
            message: "User not found",
            error: true,
            success: false
        });
    }
    
    const checkPassword = await bcrypt.compare(password, user.password);
    
    if (!checkPassword) {
        return res.status(400).json({
            message: "Password does not match",
            error: true,
            success: false
        });
    }
    
    const tokenData = {
        _id: user._id,
        email: user.email
    };
    
    const token = jwt.sign(tokenData, "123", { expiresIn: '9h' });
    const tokenOptions = {
        httpOnly:false,
        // secure:true,
        
    };
    
    return res.cookie("token", token, tokenOptions).json({
        message: "Login successfully",
        data: token,
        success: true,
        error: false
    });
};

module.exports = userLogin;
