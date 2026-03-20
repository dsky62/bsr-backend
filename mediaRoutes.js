const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Media = require("./models/Media");

// Storage config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Upload media
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    const media = new Media({
      filename: file.filename,
      url: `/uploads/${file.filename}`,
    });

    await media.save();

    res.json(media);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// Get all media
router.get("/", async (req, res) => {
  try {
    const media = await Media.find().sort({ uploadedAt: -1 });
    res.json(media);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching media" });
  }
});

// Delete media
router.delete("/:id", async (req, res) => {
  try {
    await Media.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting media" });
  }
});

module.exports = router;

