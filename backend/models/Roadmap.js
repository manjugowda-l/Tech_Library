const mongoose = require("mongoose");

const RoadmapSchema = new mongoose.Schema({
  title: String,

  level: String,

  steps: [
    {
      title: String,
      noteId: String,
    },
  ],
});

module.exports = mongoose.model(
  "Roadmap",
  RoadmapSchema
);