const roomService = require("./roomService");

exports.newRoomAdded = (io, room) => {
    io.of('lobby').emit('newroom', room);
}

exports.deleteRoom = (io, room) => {
    io.of("lobby").emit("deleteroom", room.id);
}

exports.initNewGame = (io, gameId) => {
    io.of(gameId).on('connection', (socket) => {
        console.log('player connected to room', gameId)
        socket.on("message", (msg) => {
            io.of(gameId).emit("message", msg);
        })
        socket.on("boxselected", async (data) => {
            const game = await roomService.selectBox(data.gameId, data.box);
            console.log(game)
            io.of(gameId).emit("state", game.gameState);
        })
    })
}

exports.playerJoinedGame = (io, gameId, user) => {
    io.of(gameId).emit("joined", user);
}