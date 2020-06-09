const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");

Grid.mongo = mongoose.mongo;
const User = require("./user");
const Wordcard = require("./wordcard");
const Word = require("./word");
const WordAccuracy = require("./wordAccuracy");
const Test = require("./test");
const auth = require("./config/auth");
const userController = require("./api/user/controller/userController");

const API_PORT = 3002;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  "mongodb+srv://SDM2020:secure1234@cluster0-kenyq.mongodb.net/SDM2020?retryWrites=true&w=majority";

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(methodOverride("_method"));
router.use(logger("dev"));
app.set("view engine", "ejs");
// connects our back end code with the database
//const conn = mongoose.createConnection(dbRoute);
mongoose.connect(dbRoute, { useNewUrlParser: true });

let conn = mongoose.connection;
let gfs;
conn.once("open", () => {
  console.log("connected to the database");
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// checks if connection with the database is successful
conn.on("error", console.error.bind(console, "MongoDB connection error:"));

// all GET ---------------------------------------------------------
// get all users
router.post("/getUser", (req, res) => {
  const { name } = req.body;
  var a = { name: name };
  User.find(a, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    // console.log(data)
    return res.json({ success: true, data: data });
  });
});
router.post("/getWordcard", (req, res) => {
  const { user } = req.body;
  var a = { user: user };
  console.log(a);
  Wordcard.find(a, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    // console.log(data)
    return res.json({ success: true, data: data });
  });
});
router.post("/addWordcard", (req, res) => {
  let wordcard = new Wordcard();
  const { user, name, numberOfWords } = req.body;
  if (!user || !name || !numberOfWords) {
    return res.json({
      success: false,
      error: "INVALID INPUTS",
    });
  }
  wordcard.user = user;
  wordcard.name = name;
  wordcard.numberOfWords = numberOfWords;
  wordcard.save((err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true });
  });
});
router.post("/updateWordCount", (req, res) => {
  const { user, name, update } = req.body; // update example : {numberOfWords:1000}
  Wordcard.findOneAndUpdate({ user: user, name: name }, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});
router.post("/updateWord", (req, res) => {
  const { user, wordcardName, word, update } = req.body; // update example : {numberOfWords:1000}
  Word.findOneAndUpdate({ user: user, wordcardName: wordcardName, word: word }, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});
router.delete("/deleteWord/:user/:wordcardName/:word", (req, res) => {
  Word.deleteOne(
    { user: req.params.user, wordcardName: req.params.wordcardName, word: req.params.word },
    (err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    }
  );
});
router.delete("/deleteWordcard/:user/:name", (req, res) => {
  Wordcard.deleteOne(
    { user: req.params.user, name: req.params.name },
    (err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    }
  );
});
router.post("/getWord", (req, res) => {
  const { user, wordcardName } = req.body;
  var a = { user: user, wordcardName: wordcardName };
  Word.find(a, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    // console.log(data)
    return res.json({ success: true, data: data });
  });
});
router.post("/addWord", (req, res) => {
  const wordlist = req.body;
  wordlist.forEach((eachWord) => {
    let tempWord = new Word();
    if (
      !eachWord.user ||
      !eachWord.wordcardName ||
      !eachWord.word ||
      !eachWord.definition
    ) {
      return res.json({
        success: false,
        error: "INVALID INPUTS",
      });
    }
    tempWord.user = eachWord.user;
    tempWord.wordcardName = eachWord.wordcardName;
    tempWord.word = eachWord.word;
    tempWord.definition = eachWord.definition;
    tempWord.save((err) => {
      if (err) {
        console.log(err);
        return res.json({ success: false, error: err });
      }
    });
  });
  return res.json({ success: true });
});
router.post("/getTest", (req, res) => {
  const { user } = req.body;
  var a = { user: user };
  Test.find(a, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    // console.log(data)
    return res.json({ success: true, data: data });
  });
});
router.post("/addTest", (req, res) => {
  let tempTest = new Test();
  const { user, wordcardName, questionList } = req.body;
  if (!user || !wordcardName) {
    return res.json({
      success: false,
      error: "INVALID INPUTS",
    });
  }
  tempTest.user = user;
  tempTest.wordcardName = wordcardName;
  tempTest.questionList = questionList;
  tempTest.save((err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true });
  });
});
router.post("/getWordAccuracy", (req, res) => {
  const { user, wordcardName } = req.body;
  var a = { user: user, wordcardName: wordcardName };
  WordAccuracy.find(a, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    // console.log(data)
    return res.json({ success: true, data: data });
  });
});
router.post("/addWordAccuracy", (req, res) => {
  let tempWordAccuracy = new WordAccuracy();
  const { user, wordcardName, accuracyList } = req.body;
  if (!user || !wordcardName) {
    return res.json({
      success: false,
      error: "INVALID INPUTS",
    });
  }
  tempWordAccuracy.user = user;
  tempWordAccuracy.wordcardName = wordcardName;
  tempWordAccuracy.accuracyList = accuracyList;
  tempWordAccuracy.save((err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true });
  });
});
router.post("/updateWordAccuracy", (req, res) => {
  const { user, wordcardName, update } = req.body; // update example : {numberOfWords:1000}
  Word.findOneAndUpdate({ user: user, wordcardName: wordcardName }, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});
router.delete("/deleteWordAccuracy/:user/:wordcardName", (req, res) => {
  WordAccuracy.deleteOne(
    { user: req.params.user, wordcardName: req.params.wordcardName },
    (err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    }
  );
});
router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
// router.get("/me", auth, userController.getUserDetails);

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
