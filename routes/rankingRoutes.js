const express = require("express");
const router = express.Router();

const {
  getRankings,
  getRankingById,
  createRanking,
  updateRanking,
  deleteRanking
} = require("../controllers/rankingController");

// GET all rankings
router.get("/", getRankings);

// GET single ranking
router.get("/:id", getRankingById);

// CREATE ranking
router.post("/", createRanking);

// UPDATE ranking
router.put("/:id", updateRanking);

// DELETE ranking
router.delete("/:id", deleteRanking);

module.exports = router;

