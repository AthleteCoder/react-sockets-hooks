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
    const room = {
      ...req.body
    };
    const saved = await roomService.newRoom(room);
    ioLobby.newRoomAdded(req.io, saved);
    ioLobby.initNewGame(req.io, saved._id);
    res.status(200).json(saved);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Couldnt create room, try again later"
    });
  }
};

exports.joinRoom = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const user = {
      id: req.user.id,
      email: req.user.email
    };
    const added = await roomService.joinedRoom(id, user);
    ioLobby.gameStateUpdate(req.io, added);
    res.status(200).json(added);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

exports.getGameState = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const game = await roomService.getGame(id);
    res.status(200).json(game);
  } catch (e) {
    res.status(400).json({
      message: e.message
    });
  }
};