const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  type: String,
  options: [String],
  correctAnswer: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model("Quiz", questionSchema);