var exec = require('child_process').exec;

var actualPrint = true;

module.exports.print = function(str) {
  if (actualPrint) {
    var cmd = 'python print.py "' + str + '"';
    exec(cmd, function(error, stdout, stderr) {
      console.log(stdout);
    });
  }
  else {
    console.log(str);
  }
}


