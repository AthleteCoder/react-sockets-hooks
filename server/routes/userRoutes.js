const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const jwtUtil = require("../utils/jwtUtil");

router.post("/", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/", jwtUtil.tokenMiddleware, userController.token)


module.exports = router;