const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        default: ""
    },
    message: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
});

const Note = mongoose.model('note', noteSchema);

modules.exports = Note;