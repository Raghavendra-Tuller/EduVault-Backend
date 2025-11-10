// backend/models/Note.js
const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  filePath: { type: String }, // ✅ added for PDF file path
});

module.exports = mongoose.model("Note", NoteSchema);
