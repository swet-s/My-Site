const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res) {
  var userId = req.body.userId;
  console.log(userId);
  url = "https://codeforces.com/api/user.rating?handle="+userId;
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
        res.write("<h1>"+rating+"</h1>");
      }
      res.send();
    });
  });
});

// API Key
// 8bf1d7bda2d0aab20ae319e43be666e1-us14

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
