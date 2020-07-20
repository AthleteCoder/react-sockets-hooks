const Game = require("../models/gameModel");

exports.getAllRooms = async () => {
    return await Game.find({});
}

exports.newRoom = async (room) => {
    try {
        const newRoom = new Game(room);
        return await newRoom.save();
    } catch (e) {
        console.log(e)
        throw Error("There was a problem saving room");
    }
}

exports.deleteRoom = async (roomId, email) => {
    try {
        const room = Game.findOne({
            id: roomId
        });
        if (room.createdBy !== email) {
            throw Error("Unauthorized!");
        }
        return await Game.deleteOne({
            id: roomId
        });
    } catch (e) {
        throw Error("Couldnt delete Room");
    }
}

exports.joinedRoom = async (gameId, player) => {
    try {
        const game = await Game.findOne({
            _id: gameId
        });
        game.players.push(player);
        game.save();
        return game;
    } catch (e) {
        console.log(e)
        throw Error("couldnt join game");
    }
}

exports.getPlayersInRoom = async (roomId) => {
    try {
        const game = await Game.findOne({
            _id: roomId
        });
        return game.players;
    } catch (e) {
        throw Error("Couldnt get Game players");
    }
}

exports.getGame = async (roomId) => {
    try {
        const game = await Game.findOne({
            _id: roomId
        });
        return game;
    } catch (e) {
        throw Error("Couldnt get game");
    }
}

exports.selectBox = async (gameId, box) => {
    try {
        const game = await Game.findOne({
            _id: gameId
        });
        game.gameState = [...game.gameState];
        game.gameState[box[0]][box[1]] = "O";

        await game.save();
        Game.mark
        return game;
    } catch (e) {
        throw Error("couldnt se piece")
    }
}