const https = require("https");

function getParsedData(url, callback) {
  var parsedData = new Promise(function(resolve, reject) {
    https.get(url, function(res, ratingData) {
      res.on("data", function(data) {
        resolve(JSON.parse(data));
      });
    });
  });
  parsedData.then(function(data) {
    callback(data);
  });
}

exports.getRating = function(userId, callback) {
  const url = "https://codeforces.com/api/user.info?handles=" + userId;

  getParsedData(url, function(User) {
    if (User.status == "FAILED")
      callback("Invalid User");
    else
      callback(User.result[0].rating);
  });
};
