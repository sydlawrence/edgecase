var exec = require('child_process').exec;
module.exports.playModem = function() {	
	this.play('sounds/modem.wav')
};

module.exports.play = function(file) {	
	var cmd = 'sudo aplay ' + __dirname + '/' + file
	exec(cmd, function() {    
		console.log("cmd");
    });
};