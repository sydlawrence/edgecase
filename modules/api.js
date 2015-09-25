var request = require('request');

module.exports.query = function(url, isHTTPS, cb) {
  var start = 'http://';
  if (isHTTPS) {
    start = 'https://';
  }
  var url = 'http://edge.azurewebsites.net/api/v2/scan?url=' + start + url;
  request(url, cb);
};

module.exports.test = function(url, isHTTPS, cb) {
  this.query(url, isHTTPS, function(error, response, body) {
    if (error) {
      cb(undefined, true)
      return;
    }
    body = JSON.parse(body);
    cb(body);
  });
};



