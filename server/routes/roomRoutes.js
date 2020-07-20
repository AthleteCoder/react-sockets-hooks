const express = require("express");
const router = express.Router();
const jwtUtil = require("../utils/jwtUtil");
const roomController = require("../controllers/roomController");

router.get("/", jwtUtil.tokenMiddleware, roomController.getAllRooms);
router.post("/", jwtUtil.tokenMiddleware, roomController.newRoom);
router.delete("/:id", jwtUtil.tokenMiddleware, roomController.deleteRoom);
router.get("/join/:id", jwtUtil.tokenMiddleware, roomController.joinRoom);
router.get("/:id/state", jwtUtil.tokenMiddleware, roomController.getGameState);

module.exports = router;