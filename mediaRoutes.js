const express = require("express");
const router = express.Router();
const Media = require("../models/Media");

// GET ALL MEDIA
router.get("/", async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: "Failed to load media" });
  }
});

// GET SINGLE MEDIA ITEM
router.get("/:id", async (req, res) => {
  try {
    const item = await Media.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Media not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to load media item" });
  }
});

// CREATE MEDIA
router.post("/", async (req, res) => {
  try {
    const newMedia = new Media(req.body);
    await newMedia.save();
    res.json(newMedia);
  } catch (err) {
    res.status(500).json({ error: "Failed to create media" });
  }
});

// UPDATE MEDIA
router.put("/:id", async (req, res) => {
  try {
    const updated = await Media.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update media" });
  }
});

// DELETE MEDIA
router.delete("/:id", async (req, res) => {
  try {
    await Media.findByIdAndDelete(req.params.id);
    res.json({ message: "Media deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete media" });
  }
});

module.exports = router;

