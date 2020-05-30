const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

Grid.mongo = mongoose.mongo;
const User = require("./user");

const API_PORT = 3002;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb+srv://SDM2020:secure1234@cluster0-kenyq.mongodb.net/test?retryWrites=true&w=majority";

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

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
