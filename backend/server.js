const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

Grid.mongo = mongoose.mongo;
const User = require("./user");
const Wordcard = require("./wordcard");
const Word = require("./word");

const API_PORT = 3002;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb+srv://SDM2020:secure1234@cluster0-kenyq.mongodb.net/SDM2020?retryWrites=true&w=majority";

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(methodOverride('_method'))
router.use(logger("dev"));
app.set('view engine', 'ejs')
// connects our back end code with the database
//const conn = mongoose.createConnection(dbRoute);
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let conn = mongoose.connection;
let gfs;
conn.once("open", () => {
  console.log("connected to the database")
  gfs = Grid(conn.db, mongoose.mongo);  
  gfs.collection('uploads');
});

// checks if connection with the database is successful
conn.on("error", console.error.bind(console, "MongoDB connection error:"));

// all GET ---------------------------------------------------------
// get all users
router.post("/getUser", (req, res) => {
  const {name} = req.body;
  var a = {name:name}
  User.find(a, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    // console.log(data)
    return res.json({ success: true, data: data });
  })
});
router.post("/getWordcard", (req, res) => {
  const {user} = req.body;
  var a = {user:user};
  console.log(a);
  Wordcard.find(a, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    // console.log(data)
    return res.json({ success: true, data: data });
  })
});
router.post('/addWordcard', (req, res) => {
  let wordcard = new Wordcard();
  const {user, name, numberOfWords} = req.body;
  if (!user || !name || !numberOfWords) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  wordcard.user = user;
  wordcard.name = name;
  wordcard.numberOfWords = numberOfWords;
  wordcard.save(err => {
    if (err) {console.log(err);return res.json({ success: false, error: err });}
    return res.json({ success: true });
  })
})
router.post("/getWord", (req, res) => {
  const {user, wordcardName} = req.body;
  var a = {user:user, wordcardName:wordcardName};
  Word.find(a, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    // console.log(data)
    return res.json({ success: true, data: data });
  })
});
router.post('/addWord', (req, res) => {
  const wordlist = req.body;
  wordlist.forEach(eachWord => {
    let tempWord = new Word();
    if (!eachWord.user || !eachWord.wordcardName || !eachWord.word || !eachWord.definition) {
      return res.json({
        success: false,
        error: "INVALID INPUTS"
      });
    }
    tempWord.user = eachWord.user;
    tempWord.wordcardName = eachWord.wordcardName;
    tempWord.word = eachWord.word;
    tempWord.definition = eachWord.definition;
    tempWord.save(err => {
      if (err) {console.log(err);return res.json({ success: false, error: err });}
    })
  });
  return res.json({ success: true });
})

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
