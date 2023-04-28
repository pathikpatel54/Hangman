const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const { Score, Word, StringModel } = require("./models");

const router = express.Router();

router.use(bodyParser.json({ limit: "50mb" }));

// Get list of scores
router.get("/scores", async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1 });
    res.json(scores);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Add score to a specific document
router.post("/score", async (req, res) => {
  const { name, result } = req.body;

  try {
    let score = await Score.findOne({ name });

    if (!score) {
      score = new Score({ name });
    }

    if (result === "win") {
      score.score += 10;
    } else if (result === "loss" && score.score > 0) {
      score.score -= 1;
    }

    await score.save();

    res.json(score);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Generate a custom game URL for custom word
router.post("/generate", async (req, res) => {
  const { word } = req.body;

  try {
    const randomstring = uuid.v4();
    const newWord = new Word({ randomstring, value: word });
    await newWord.save();

    res.json({ url: `${randomstring}` });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Get a random word
router.get("/words", async (req, res) => {
  try {
    const count = await StringModel.countDocuments();
    const random = Math.floor(Math.random() * count);
    const word = await StringModel.findOne().skip(random);
    res.json(word);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Get the word saved in db with randomstring
router.get("/words/:randomstring", async (req, res) => {
  const { randomstring } = req.params;

  try {
    const word = await Word.findOne({ randomstring });

    if (!word) {
      res.sendStatus(404);
      return;
    }

    res.json(word);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/add-strings", async (req, res) => {
  try {
    const strings = req.body; // Assuming the request body has an array of strings in the "strings" field
    const promises = strings.map(async (string) => {
      const newString = new StringModel({ value: string });
      await newString.save();
    });
    await Promise.all(promises);
    res.status(200).send("Strings added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while adding strings");
  }
});

module.exports = router;
