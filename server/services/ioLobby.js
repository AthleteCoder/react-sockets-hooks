const roomService = require("./roomService");

exports.newRoomAdded = (io, room) => {
  io.of("lobby").emit("newroom", room);
};

exports.deleteRoom = (io, room) => {
  io.of("lobby").emit("deleteroom", room.id);
};

exports.initNewGame = (io, gameId) => {
  io.of(gameId).on("connection", (socket) => {
    socket.on("message", (msg) => {
      io.of(gameId).emit("message", msg);
    });
    socket.on("boxselected", async (data) => {
      try {
        const game = await roomService.selectBox(
          data.gameId,
          data.box,
          data.email
        );
        this.gameStateUpdate(io, game);
      } catch (e) {
        console.log(e.message);
      }
    });
  });
};

exports.gameStateUpdate = (io, game) => {
  io.of(game._id).emit("stateupdate", game);
};
