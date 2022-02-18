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

const uri = "mongodb+srv://cubenbits:9LYgZzVNGWrQv6j@cluster0.rde6e.mongodb.net/";

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

const beluga = new Character({
  name: "Beluga",
  type: "Cat",
  description: "Beluga lives in Honolulu, Hawaii. He is most likely 19 years old. His bedtime is always at 7pm, even though his school days are always random, and always start at random times of day. While he is human, he turns into a polite cat in the middle of the night.",
  age: 19,
  imageUrl: "https://static.wikia.nocookie.net/beluga/images/9/99/Beluga_d.png"
})
const hecker = new Character({
  name: "Hecker",
  type: "Cat",
  description: "Hecker is a good friend to Beluga and is always there to help him. He is one of the most if not the most powerful cat. Hecker always finds your password. He also has his own hiring website where people can hire him for his hecking services.",
  age: 40,
  imageUrl: "https://static.wikia.nocookie.net/beluga/images/9/9c/Hecker.jpg"
})
const skittle = new Character({
  name: "Skittle",
  type: "Dog",
  description: "Skittle is an astronaut Shiba Inu.  He is a friend of Beluga. He normally hangs out with Beluga and helps him in some way.",
  age: 22,
  imageUrl: "https://static.wikia.nocookie.net/beluga/images/f/f6/Skittle.jpg"
})

var characterList = [beluga, hecker, skittle];

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
