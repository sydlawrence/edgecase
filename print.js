var exec = require('child_process').exec;

var actualPrint = true;

module.exports.print = function(str) {
  str += '\n\n\nThanks for popping by!\nFind out more at\nhttp://dev.modern.ie\nMuch Love @msdevuk @martinkearn @msdevuk\n#microsoftedgecase';
  str += '\n\n\n';

  if (actualPrint) {
    var cmd = 'python ' + __dirname + '/print.py "' + str + '"';

    exec(cmd, function(error, stdout, stderr) {
      console.log(stdout);
    });
  }
  else {
    console.log(str);
  }
};


