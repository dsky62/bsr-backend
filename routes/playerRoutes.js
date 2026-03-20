const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getPlayers,
  getPlayerById,
  addPlayer,
  updatePlayer,
  deletePlayer
} = require("../controllers/playerController");

// GET all players
router.get("/", getPlayers);

// GET single player
router.get("/:id", getPlayerById);

// CREATE player
router.post("/", upload.single("photo"), addPlayer);

// UPDATE player
router.put("/:id", upload.single("photo"), updatePlayer);

// DELETE player
router.delete("/:id", deletePlayer);

module.exports = router;

