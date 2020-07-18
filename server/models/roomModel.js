const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomScheme = new Schema({
    title: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true
    },
    type: {
        type: String,
        required: true,
        default: "Basic"
    }
}, {
    timestamps: true
});

const Room = mongoose.model('room', RoomScheme);

module.exports = Room;