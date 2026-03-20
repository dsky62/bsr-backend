const Ranking = require("../models/Ranking");
const Player = require("../models/Player");

// GET all ranking pages
exports.getRankings = async (req, res) => {
  try {
    const rankings = await Ranking.find()
      .sort({ classYear: -1, title: 1 });

    res.json(rankings);
  } catch (err) {
    console.error("Error fetching rankings:", err);
    res.status(500).json({ error: "Error fetching rankings" });
  }
};

// GET a single ranking page with all ranked players populated
exports.getRankingById = async (req, res) => {
  try {
    const ranking = await Ranking.findById(req.params.id)
      .populate("players.playerId", "name position class height weight image school");

    if (!ranking) {
      return res.status(404).json({ error: "Ranking not found" });
    }

    // Ensure players are sorted by rank
    ranking.players.sort((a, b) => a.rank - b.rank);

    res.json(ranking);
  } catch (err) {
    console.error("Error fetching ranking:", err);
    res.status(500).json({ error: "Error fetching ranking" });
  }
};

// CREATE a ranking page with multiple players
exports.createRanking = async (req, res) => {
  try {
    const { title, classYear, description, players } = req.body;

    if (!title || !classYear) {
      return res.status(400).json({ error: "Title and classYear are required" });
    }

    // Validate players array
    if (!Array.isArray(players)) {
      return res.status(400).json({ error: "Players must be an array" });
    }

    // Sort players by rank before saving
    players.sort((a, b) => a.rank - b.rank);

    const ranking = await Ranking.create({
      title,
      classYear,
      description,
      players
    });

    res.status(201).json(ranking);
  } catch (err) {
    console.error("Error creating ranking:", err);
    res.status(500).json({ error: "Error creating ranking" });
  }
};

// UPDATE a ranking page (title, classYear, description, players)
exports.updateRanking = async (req, res) => {
  try {
    const { title, classYear, description, players } = req.body;

    const ranking = await Ranking.findById(req.params.id);
    if (!ranking) {
      return res.status(404).json({ error: "Ranking not found" });
    }

    ranking.title = title ?? ranking.title;
    ranking.classYear = classYear ?? ranking.classYear;
    ranking.description = description ?? ranking.description;

    if (Array.isArray(players)) {
      // Sort players by rank before saving
      players.sort((a, b) => a.rank - b.rank);
      ranking.players = players;
    }

    const updated = await ranking.save();
    res.json(updated);
  } catch (err) {
    console.error("Error updating ranking:", err);
    res.status(500).json({ error: "Error updating ranking" });
  }
};

// DELETE a ranking page
exports.deleteRanking = async (req, res) => {
  try {
    const deleted = await Ranking.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Ranking not found" });
    }

    res.json({ message: "Ranking deleted" });
  } catch (err) {
    console.error("Error deleting ranking:", err);
    res.status(500).json({ error: "Error deleting ranking" });
  }
};

