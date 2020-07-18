exports.newRoomAdded = (req, room) => {
    req.io.of('lobby').emit('newroom', room);
}

exports.deleteRoom = (req, room) => {
    req.io.of("lobby").emit("deleteroom", room.id);
}