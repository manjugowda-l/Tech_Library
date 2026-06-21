const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    pdfUrl: String,
    thumbnail: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Note", NoteSchema);