const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CustomArray = new Schema([String]);

const GameScheme = new Schema({
    createdBy: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    title: String,
    players: {
        type: Array,
        default: []
    },
    type: {
        type: String,
        default: "TicTacToe",
        required: true
    },
    won: {
        type: String
    },
    gameState: {
        type: [CustomArray],
        default: [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    },
    playerTurn: String
}, {
    timestamps: true
});

const Game = mongoose.model('game', GameScheme);

module.exports = Game;