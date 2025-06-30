const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


const quizRoutes = require("./routes/quizRoutes");
app.use("/api/quiz", quizRoutes);

const leaderboardRoutes = require("./routes/leaderboardRoutes");
app.use("/api/leaderboard", leaderboardRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));