const Room = require("../models/roomModel");

exports.getAllRooms = async () => {
    return await Room.find({});
}

exports.newRoom = async (room) => {
    try {
        const newRoom = new Room(room);
        return await newRoom.save();
    } catch (e) {
        throw Error("There was a problem saving room");
    }
}

exports.deleteRoom = async (roomId, email) => {
    try {
        const room = Room.findOne({
            id: roomId
        });
        if (room.createdBy !== email) {
            throw Error("Unauthorized!");
        }
        return await Room.deleteOne({
            id: roomId
        });
    } catch (e) {
        throw Error("Couldnt delete Room");
    }
}