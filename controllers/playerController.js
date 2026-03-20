const Player = require("../models/Player");

// GET all players
exports.getPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET single player
exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ADD player
exports.addPlayer = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.photo = req.file.filename;
    }

    const player = await Player.create(data);
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE player
exports.updatePlayer = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.photo = req.file.filename;
    }

    const updated = await Player.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE player
exports.deletePlayer = async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.json({ message: "Player deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

