const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const roomRoutes = require("./roomRoutes");

router.use("/api/v1/user/", userRoutes);
router.use("/api/v1/room", roomRoutes);


module.exports = router;