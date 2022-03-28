// https://asdfast.beobit.net/api/?type=paragraph&length=60&startLorem=true
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

exports.getText = function(callback) {
  var url = "https://asdfast.beobit.net/api/?type=paragraph&length=2&startLorem=false";

  getParsedData(url, function(data) {
    callback(data.text);
  });
};
