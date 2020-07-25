const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicTacToe = new Schema({
    won: {
        type: Number,
        default: 0
    },
    lost: {
        type: Number,
        default: 0
    }
})

const Games = new Schema({
    tictactoe: TicTacToe
})

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: false,
        select: false
    },
    role: {
        type: String,
        default: 'basic',
        enum: ["basic", "supervisor", "admin"]
    },
    games: {
        type: Games,
        default: {
            tictactoe: TicTacToe
        }
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;