const roomService = require("../services/roomService");
const ioLobby = require("../services/ioLobby");
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.status(200).json(rooms);
  } catch (e) {
    res.status(400).json({
      message: "There was a problem fetching rooms",
    });
  }
};

exports.newRoom = async (req, res) => {
  try {
    const room = { ...req.body };
    const saved = await roomService.newRoom(room);
    ioLobby.newRoomAdded(req.io, saved);
    ioLobby.initNewGame(req.io, saved._id);
    const playerJoined = await roomService.joinedRoom(saved._id, {
      id: req.user.id,
      email: req.user.email,
    });
    res.status(200).json(playerJoined);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Couldnt create room, try again later" });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await roomService.deleteRoom(id, req.user.email);
    ioLobby.deleteRoom(req, deleted);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.joinRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const user = { id: req.user.id, email: req.user.email };
    const added = await roomService.joinedRoom(id, user);
    ioLobby.gameStateUpdate(req.io, added);
    res.status(200).json(added);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getGameState = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await roomService.getGame(id);
    res.status(200).json(game);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
