var exec = require('child_process').exec;

var actualPrint = true;

module.exports.print = function(str) {
  str += '\n\n\nThanks for popping by!\nFind out more at\nhttp://modern.ie';
  str += '\n\n\n';
  str += ''+
'   _       _--\"\"--_ \n'+
'     \" --\"\"   |    |\n'+
'   \" . _|     |    |\n'+
'   _    |  _--\"\"--_|\n'+
'     \" --\"\"   |    |\n'+
'   \" . _|     |    |\n'+
'   _    |  _--\"\"--_|\n'+
'     \" --\"\"         \n';


  if (actualPrint) {
    var cmd = 'python print.py "' + str + '"';

    exec(cmd, function(error, stdout, stderr) {
      console.log(stdout);
    });
  }
  else {
    console.log(str);
  }
};

module.exports.print('hi there');


