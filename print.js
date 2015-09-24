var exec = require('child_process').exec;

var actualPrint = true;

module.exports.print = function(str) {
  str += '\n\n\nThanks for popping by!\nFind out more at http://modern.ie';
  str += '\n\n\n';

  str = '                 __'+
'            ,-~¨^  ^¨-,           _,'+
'           /          / ;^-._...,¨/'+
'          /          / /         /'+
'         /          / /         /'+
'        /          / /         /'+
'       /,.-:''-,_ / /         /'+
'       _,.-:--._ ^ ^:-._ __../'+
'     /^         / /¨:.._¨__.;'+
'    /          / /      ^  /'+
'   /          / /         /'+
'  /          / /         /'+
' /_,.--:^-._/ /         /'+
'^            ^¨¨-.___.:^ '+


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


