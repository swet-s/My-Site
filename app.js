const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");
const https = require("https");

const codeforces = require(__dirname + "/public/scripts/codeforces.js")
const textGenerator = require(__dirname + "/public/scripts/loremGen.js")

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({
  extended: true
}));


mongoose.connect("mongodb://localhost:27017/myDB", {
  useNewUrlParser: true
});

const itemsSchema = {
  name: String
}
const Item = mongoose.model("Item", itemsSchema);

const beluga = new Item({
  name: "Beluga"
})
const hecker = new Item({
  name: "Hecker"
})
const skittle = new Item({
  name: "Skittle"
})

// Item.insertMany([beluga, hecker, skittle], function(err){
//   if (err) console.log(err);
//   else console.log("Successfully saved all items.");
// });



app.get("/", function(req, res) {
  // res.sendFile(__dirname+"/public/res/mydp.jpg");
  res.render("home", {
    activeHome: "active",
    activeAbout: "",
    activeContact: ""
  });
});

app.post("/", function(req, res) {
  var userId = req.body.userId;
  codeforces.getRating(userId, function(rating) {
    res.render("post", {
      activeHome: "active",
      activeAbout: "",
      activeContact: "",
      rating: rating
    });
  });
});

app.get("/about", function(req, res) {
  textGenerator.getText(function(generatedText) {
    res.render("about", {
      activeHome: "",
      activeAbout: "active",
      activeContact: "",
      aboutContent: generatedText
    });
  });
});

app.get("/contact", function(req, res) {
  textGenerator.getText(function(generatedText) {
    res.render("contact", {
      activeHome: "",
      activeAbout: "",
      activeContact: "active",
      contactContent: generatedText
    });
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});

// API Key
// 8bf1d7bda2d0aab20ae319e43be666e1-us14
