const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
});

const wordSchema = new mongoose.Schema({
  randomstring: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: String,
    required: true,
  },
});

// Create a Mongoose schema for the strings
const randomSchema = new mongoose.Schema({
  value: String,
});

// Create a Mongoose model for the strings
const StringModel = mongoose.model("String", randomSchema);

const Score = mongoose.model("Score", scoreSchema);
const Word = mongoose.model("Word", wordSchema);

module.exports = {
  Score,
  Word,
  StringModel,
};
