const userService = require("../services/userService");

exports.registerUser = async (req, res) => {
    const {
        password,
        email
    } = req.body;
    if (!email || !password) {
        res.status(401).json({
            message: "Access denied!"
        });
        return;
    }
    try {
        const user = await userService.registerNewUser(password, email);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}

exports.loginUser = async (req, res) => {
    const {
        password,
        email
    } = req.body;
    try {
        const token = await userService.loginUser(password, email);
        res.status(200).json({
            token: token
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}

exports.token = async (req, res) => {
    const {
        email
    } = req.user;
    try {
        const user = await userService.getUserFromToken(email);
        res.json(user);
    } catch (err) {
        res.status(401).json({
            message: "User not found"
        });
    }
}