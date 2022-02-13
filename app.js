const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({
  extended: true
}));



app.get("/", function(req, res) {
  // res.sendFile(__dirname+"/public/res/mydp.jpg");
  res.render("index", {
    activeHome: "active",
    activeAbout: "",
    activeContact: ""
  });
});

app.post("/", function(req, res) {
  var userId = req.body.userId;
  console.log(userId);
  url = "https://codeforces.com/api/user.rating?handle=" + userId;
  https.get(url, function(resHttps) {
    resHttps.on("data", function(data) {
      const ratingData = JSON.parse(data);
      if (ratingData.status == "FAILED")
        res.write("Invalid User");
      else {
        var totalContest = ratingData.result.length;
        var rating = 0;
        if (totalContest != 0)
          rating = ratingData.result[totalContest - 1].newRating;

        console.log(rating);
        res.write("<h1>" + rating + "</h1>");
      }
      res.send();
    });
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    activeHome: "",
    activeAbout: "active",
    activeContact: "",
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    activeHome: "",
    activeAbout: "",
    activeContact: "active",
    contactContent: contactContent
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});

// API Key
// 8bf1d7bda2d0aab20ae319e43be666e1-us14
