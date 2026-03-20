const express = require("express");
const router = express.Router();
const Camp = require("../models/Camp");

// GET all camps
router.get("/", async (req, res) => {
  try {
    const camps = await Camp.find();
    res.json(camps);
  } catch (err) {
    console.error("Error fetching camps:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET single camp by ID
router.get("/:id", async (req, res) => {
  try {
    const camp = await Camp.findById(req.params.id);
    if (!camp) return res.status(404).json({ error: "Camp not found" });
    res.json(camp);
  } catch (err) {
    console.error("Error fetching camp:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// CREATE a new camp
router.post("/", async (req, res) => {
  try {
    const camp = new Camp(req.body);
    await camp.save();
    res.json(camp);
  } catch (err) {
    console.error("Error creating camp:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE a camp
router.put("/:id", async (req, res) => {
  try {
    const camp = await Camp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!camp) return res.status(404).json({ error: "Camp not found" });
    res.json(camp);
  } catch (err) {
    console.error("Error updating camp:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE a camp
router.delete("/:id", async (req, res) => {
  try {
    const camp = await Camp.findByIdAndDelete(req.params.id);
    if (!camp) return res.status(404).json({ error: "Camp not found" });
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting camp:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

