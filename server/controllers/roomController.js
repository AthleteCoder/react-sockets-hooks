const roomService = require("../services/roomService");
const ioLobby = require("../services/ioLobby");

exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await roomService.getAllRooms();
        res.status(200).json(rooms);
    } catch (e) {
        res.status(400).json({
            message: "There was a problem fetching rooms"
        });
    }
}

exports.newRoom = async (req, res) => {
    try {
        const room = { ...req.body };
        const saved = await roomService.newRoom(room);
        ioLobby.newRoomAdded(req, saved);
        res.status(200).json(saved);
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: "Couldnt create room, try again later" });
    }
}

exports.deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await roomService.deleteRoom(id, req.user.email);
        ioLobby.deleteRoom(req, deleted);
        res.status(200).json(deleted);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}