const Game = require("../models/gameModel");
const userService = require("../services/userService");

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

exports.deleteRoom = async (roomId) => {
  try {
    return await Game.deleteOne({
      _id: roomId,
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
    console.log(e)
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
      const save = await Game.findOneAndUpdate({
        _id: gameId,
      }, {
        $set: {
          [`gameState.${box[0]}.data.${box[1]}`]: game.playersOptions[
            userIndex
          ],
          playerTurn: game.players[playerTurnIndex].id,
        },
      }, {
        useFindAndModify: false,
        new: true,
      });
      const state = save.gameState;
      let won = "";
      if (
        state[0].data[0] !== "" && // 1, 1, 1
        state[0].data[0] === state[1].data[0] && // 0 ,0 ,0
        state[0].data[0] === state[2].data[0] // 0, 0, 0
      ) {
        won = state[0].data[0];
      } else if (state[1].data[0] !== "" && //0,0,0
        state[1].data[0] === state[1].data[1] && //1,1,1
        state[1].data[0] === state[1].data[2]) { //0,0,0
        won = state[1].data[0];
      } else if (state[2].data[0] !== "" && //0,0,0
        state[2].data[0] === state[2].data[1] && //0,0,0,
        state[2].data[0] === state[2].data[2]) { //1,1,1
        won = state[2].data[0];
      } else if (
        state[0].data[0] !== "" && //1,0,0
        state[0].data[0] === state[1].data[0] && //1,0,0
        state[0].data[0] === state[2].data[0] //1,0,0
      ) {
        won = state[0].data[0];
      } else if (state[0].data[1] !== "" && //0,1,0
        state[0].data[1] === state[1].data[1] && //0,1,0
        state[0].data[1] === state[2].data[1]) { //0,1,0
        won = state[0].data[1];
      } else if (state[0].data[2] !== "" && //0,0,1
        state[0].data[2] === state[1].data[2] && //0,0,1
        state[0].data[2] === state[2].data[2]) { //0,0,1
        won = state[0].data[2];
      } else if (state[0].data[0] !== "" && //1,0,0
        state[0].data[0] === state[1].data[1] && //0,1,0
        state[0].data[0] === state[2].data[2]) { //0,0,1
        won = state[0].data[0];
      } else if (state[0].data[2] !== "" && //0,0,1
        state[0].data[2] === state[1].data[1] && //0,1,0
        state[0].data[2] === state[2].data[0]) { //1,0,0
        won = state[0].data[2];
      }
      if (won) {
        const playerIndex = game.playersOptions.findIndex(item => item === won);
        const wonPlayer = game.players[playerIndex].id;
        const lostPlayer = game.players[playerIndex === 0 ? 1 : 0].id;
        save.won = wonPlayer;
        save.paused = true;
        userService.playerWonTicTacToe(wonPlayer);
        userService.playerLostTicTacToe(lostPlayer);
        await save.save();
      }
      return save;
    }
  } catch (e) {
    console.log(e);
    throw Error("couldnt set piece");
  }
};

exports.playerLeftRoom = async (user, gameId) => {
  try {
    const game = await this.getGame(gameId);
    if (game) {
      if (game.players.length === 1) {
        await this.deleteRoom(gameId);
      }
      game.players = game.players.filter(p => p.id === user.id);
      game.paused = true;
      return game;
    }
  } catch (e) {
    console.log(e)
    throw Error("couldnt find room or player doesnt exists");
  }
}