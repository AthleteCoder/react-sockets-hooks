const express = require("express");
const router = express.Router();
const jwtUtil = require("../utils/jwtUtil");
const roomController = require("../controllers/roomController");

router.get("/", jwtUtil.tokenMiddleware, roomController.getAllRooms);
router.post("/", jwtUtil.tokenMiddleware, roomController.newRoom);
router.get("/:id/state", jwtUtil.tokenMiddleware, roomController.getGameState);

module.exports = router;