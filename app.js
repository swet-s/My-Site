require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");
const https = require("https");
const bcrypt = require("bcrypt");
const cors = require("cors");

// const codeforces = require(__dirname + "/public/scripts/codeforces.js")
// const textGenerator = require(__dirname + "/public/scripts/loremGen.js")

const dbModel = require("./dbModel.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors());
// app.set("view engine", "ejs");
// app.use(express.static("public"));

const port = process.env.PORT || 3001;

const saltRounds = 10;
bcrypt.hash("Hashing Completed", saltRounds, function(err, hash) {
  console.log(hash);
  bcrypt.compare("Hashing Completed", hash, function(err, result) {
    console.log(result);
  });
});

const uri = "mongodb+srv://cubenbits:" + process.env.API_KEY + "@cluster0.rde6e.mongodb.net/";

mongoose.connect(uri + "myDB", {
  useNewUrlParser: true
});

app.get('/', (req, res) => {
  dbModel.find()
  .then(characters => res.send(characters))
  .catch(err => res.status(400).send('Error: ' + err));
});

app.post('/create', (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const website = req.body.website;

  const newCharacter = new dbModel({
    name,
    description,
    imageUrl,
    website
  });

  newCharacter.save(err => {
    if (err) console.log(err);
    else console.log("Successfully Inserted.");
  });
});

app.get("/:id", (req, res) => {
    const id = req.params.id;
    dbModel.findById(id)
    .then(character => res.send(character))
    .catch(err => res.status(400).send('Error: ' + err));
});

app.put("/update/:id", (req, res) => {

});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  dbModel.findByIdAndDelete(id)
  .then(character => console.log(`Successfully deleted ${id}`));
});


// const appList = [{
//   name: "CF Profile",
//   kebab: "cf-profile",
// }];
//
// app.route("/about")
//   .get(function(req, res) {
//     textGenerator.getText(function(generatedText) {
//       res.render("about", {
//         activeClass: "about",
//         appList: appList,
//         content: generatedText
//       });
//     });
//   });
//
// app.route("/contact")
//   .get(function(req, res) {
//     textGenerator.getText(function(generatedText) {
//       res.render("contact", {
//         activeClass: "contact",
//         appList: appList,
//         content: generatedText
//       });
//     });
//   });
//
//
// app.route("/signup")
//   .get(function(req, res) {
//     textGenerator.getText(function(generatedText) {
//       res.render("signup", {
//         activeClass: "contact",
//         appList: appList,
//         content: generatedText
//       });
//     });
//   });
//
// app.get("/more/:appName", function(req, res) {
//   res.render(req.params.appName, {
//     activeClass: "more",
//     appList: appList
//   });
// });
//
// app.post("/more/cf-rating", function(req, res) {
//   var userId = req.body.userId;
//   codeforces.getRating(userId, function(rating) {
//     res.render("post", {
//       rating: rating,
//       appList: appList,
//       activeClass: "more",
//     });
//   });
// });

app.listen(port, ()=> {
  console.log(`Server started on port ${port}`);
});
