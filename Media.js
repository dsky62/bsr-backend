const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  filename: String,
  url: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Media", MediaSchema);

