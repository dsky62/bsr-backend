const express = require("express");
const router = express.Router();
const Team = require("../models/Team");

// GET all teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find().sort({ name: 1 });
    res.json(teams);
  } catch (err) {
    console.error("Error fetching teams:", err);
    res.status(500).json({ error: "Error fetching teams" });
  }
});

// ⭐ GET single team (required for team profile)
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json(team);
  } catch (err) {
    console.error("Error fetching team:", err);
    res.status(500).json({ error: "Error fetching team" });
  }
});

// CREATE team
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const team = await Team.create(data);
    res.status(201).json(team);
  } catch (err) {
    console.error("Error creating team:", err);
    res.status(500).json({ error: "Error creating team" });
  }
});

// UPDATE team
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await Team.findByIdAndUpdate(id, data, { new: true });

    if (!updated) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating team:", err);
    res.status(500).json({ error: "Error updating team" });
  }
});

// DELETE team
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Team.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.json({ message: "Team deleted" });
  } catch (err) {
    console.error("Error deleting team:", err);
    res.status(500).json({ error: "Error deleting team" });
  }
});

// TEMP: Seed a test team
router.get("/seed/test", async (req, res) => {
  try {
    const team = await Team.create({
      name: "Demo Team",
      city: "Seattle",
      state: "WA",
      level: "Varsity",
      record: "10-2",
      logo: ""
    });

    res.json(team);
  } catch (err) {
    console.error("Seed error:", err);
    res.status(500).json({ error: "Seed failed" });
  }
});

module.exports = router;

