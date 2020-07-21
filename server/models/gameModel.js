const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Cols = new Schema({
    col: String,
    data: [String]
})

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
        type: [Cols],
        default: [{
            col: '0',
            data: ['', '', '']
        }, {
            col: '1',
            data: ['', '', '']
        }, {
            col: '2',
            data: ['', '', '']
        }]
    },
    playersOptions: {
        type: [String],
        default: ['X', 'O']
    },
    playerTurn: String,
    paused:{
        type:Boolean,
        default:true
    }
}, {
    timestamps: true
});

const Game = mongoose.model('game', GameScheme);

module.exports = Game;