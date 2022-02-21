require("dotenv").config();
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

<<<<<<< HEAD
const uri = "mongodb+srv://cubenbits:"+process.env.API_KEY+"@cluster0.rde6e.mongodb.net/";
=======
const uri = "mongodb+srv://cubenbits:Ol9BcuqnlsBHZsLe@cluster0.rde6e.mongodb.net/";
>>>>>>> 2524ba2e09d66e2cb5c84506d613a7aa9b192834

mongoose.connect(uri + "myDB", {
  useNewUrlParser: true
});

const characterSchema = {
  name: String,
  type: String,
  description: String,
  age: Number,
  imageUrl: String
}
const Character = mongoose.model("Character", characterSchema);

const skittleChan = new Character({
  name: "skittle-chan",
  type: "Anime Girl",
  description: "skittle-chan has a crush on Beluga and is seen to be close friends with him in many videos. She is always kind to Beluga and sometimes even does whatever he says. She even went as far as almost marrying him, but she messed up his keyboard, causing Beluga to accidentally type that he had a girlfriend, this makes skittle-chan go offline due to deep sadness. This shows how much she loves Beluga. skittle-chan acts shy around all boys unless she is angry.",
  age: 23,
  imageUrl: "https://static.wikia.nocookie.net/beluga/images/b/bf/Skittle-Chan-HIGH-QUALITY.png"
})

var characterList = [skittleChan];

// Character.insertMany(characterList, function(err){
//   if (err) console.log(err);
//   else console.log("Successfully saved all items.");
// });

const appList = [{
  name: "CF Profile",
  kebab: "cf-profile",
}];


app.route("/")
  .get(function(req, res) {
    Character.find(function(err, characterList) {
      if (err) {
        console.log(err);
      } else {
        res.render("home", {
          activeClass: "home",
          appList: appList,
          characterList: characterList
        });
      }
    });
  })
  .post(function(req, res) {
    var userId = req.body.userId;
    codeforces.getRating(userId, function(rating) {
      res.render("post", {
        rating: rating,
        appList: appList,
        activeClass: "home",
      });
    });
  });

app.route("/about")
  .get(function(req, res) {
    textGenerator.getText(function(generatedText) {
      res.render("about", {
        activeClass: "about",
        appList: appList,
        content: generatedText
      });
    });
  });

app.route("/contact")
  .get(function(req, res) {
    textGenerator.getText(function(generatedText) {
      res.render("contact", {
        activeClass: "contact",
        appList: appList,
        content: generatedText
      });
    });
  });

app.get("/more/:appName", function(req, res) {
  res.render(req.params.appName, {
    activeClass: "more",
    appList: appList
  });
});

app.post("/more/cf-rating", function(req, res) {
  var userId = req.body.userId;
  codeforces.getRating(userId, function(rating) {
    res.render("post", {
      rating: rating,
      appList: appList,
      activeClass: "more",
    });
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});

// API Key
// 8bf1d7bda2d0aab20ae319e43be666e1-us14
