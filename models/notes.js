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
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Note = mongoose.model('note', noteSchema);

module.exports = Note;