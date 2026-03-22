const mongoose = require("mongoose");

const rankingSchema = new mongoose.Schema(
  {
    playerId: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
    rank: { type: Number, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ranking", rankingSchema);

