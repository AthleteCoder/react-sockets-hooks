const Game = require("../models/gameModel");

exports.getAllRooms = async () => {
  return await Game.find({});
};

exports.newRoom = async (room) => {
  try {
    const newRoom = new Game(room);
    return await newRoom.save();
  } catch (e) {
    console.log(e);
    throw Error("There was a problem saving room");
  }
};

exports.deleteRoom = async (roomId, email) => {
  try {
    const room = Game.findOne({
      id: roomId,
    });
    if (room.createdBy !== email) {
      throw Error("Unauthorized!");
    }
    return await Game.deleteOne({
      id: roomId,
    });
  } catch (e) {
    throw Error("Couldnt delete Room");
  }
};

exports.joinedRoom = async (gameId, player) => {
  try {
    const game = await Game.findOne({
      _id: gameId,
    });
    game.players.push(player);
    if (game.players.length === 2) {
      game.playerTurn = game.players[0].id;
      game.paused = false;
    }
    game.save();
    return game;
  } catch (e) {
    console.log(e);
    throw Error("couldnt join game");
  }
};

exports.getPlayersInRoom = async (roomId) => {
  try {
    const game = await Game.findOne({
      _id: roomId,
    });
    return game.players;
  } catch (e) {
    throw Error("Couldnt get Game players");
  }
};

exports.getGame = async (roomId) => {
  try {
    const game = await Game.findOne({
      _id: roomId,
    });
    return game;
  } catch (e) {
    throw Error("Couldnt get game");
  }
};

exports.selectBox = async (gameId, box, email) => {
  try {
    const game = await Game.findOne({
      _id: gameId,
    });
    const userIndex = game.players.findIndex((item) => item.email === email);
    if (game.gameState[box[0]].data[box[1]] !== "") {
      console.log("piece already selected");
      throw Error("Piece already selected!");
    } else {
      let playerTurnIndex = game.players.findIndex(
        (p) => p.id === game.playerTurn
      );
      playerTurnIndex = playerTurnIndex === 0 ? 1 : 0;
      const save = await Game.findOneAndUpdate(
        {
          _id: gameId,
        },
        {
          $set: {
            [`gameState.${box[0]}.data.${box[1]}`]: game.playersOptions[
              userIndex
            ],
            playerTurn: game.players[playerTurnIndex].id,
          },
        },
        {
          useFindAndModify: false,
          new: true,
        }
      );
      const state = save.gameState;
      if (
        state[0].data[0] !== "" &&
        state[0].data[0] === state[1].data[0] &&
        state[0].data[0] === state[2].data[0]
      ) {
        console.log("player " + [state[0].data[0]] + " Won");
      } else if (
        state[0].data[0] !== "" &&
        state[0].data[0] === state[0].data[1] &&
        state[0].data[0] === state[0].data[2]
      ) {
        console.log("player " + [state[0].data[0]] + " Won");
      }
      return save;
    }
  } catch (e) {
    console.log(e);
    throw Error("couldnt set piece");
  }
};
