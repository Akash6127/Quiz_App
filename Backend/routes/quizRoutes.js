const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const Leaderboard = require("../models/Leaderboard");

router.get("/", async (req, res) => {
  const questions = await Quiz.find();
  res.json(questions);
});
router.post("/check", async (req, res) => {
  try {
    const { username } = req.body;

    const user = await Leaderboard.findOne({ username });

    if (user) {
      return res.status(200).json({
        message: "You have already done this Quiz game",
        data: user,
      });
    } else {
      return res.status(201).json({
        message: "User not found in leaderboard. You can attempt the quiz.",
      });
    }

  } catch (error) {
    console.error("Error checking user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/submit", async (req, res) => {
  const { answers, username } = req.body;
  let score = 0;
  const total = answers.length;
  const questions = await Quiz.find();

  answers.forEach(ans => {
    const q = questions[ans.question];
    if (q.correctAnswer === ans.answer) score++;
  });

  await Leaderboard.create({ username, score, total });
  res.json({ score, total });
});

module.exports = router;