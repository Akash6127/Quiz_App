const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  username: String,
  score: Number,
  total: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Leaderboard", leaderboardSchema);
