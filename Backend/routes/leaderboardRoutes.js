const express = require("express");
const router = express.Router();
const Leaderboard = require("../models/Leaderboard");

router.get("/", async (req, res) => {
  const scores = await Leaderboard.find().sort({ score: -1 });
  res.json(scores);
});

module.exports = router;