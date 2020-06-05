const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  { 
    user: {
      type: String,
    },
    wordcardName: {
      type: String,
    },
    word: {
      type: String,
    },
    definition: {
      type: String,
    },
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("words", DataSchema);
