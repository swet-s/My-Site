const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const characterSchema = new Schema({
  name: String,
  description: String,
  age: Number,
  imageUrl: String
});

exports.Character = mongoose.model("Character", characterSchema);
