var exec = require('child_process').exec;
module.exports.playModem = function() {	
	this.play('sounds/modem.wav')
};

module.exports.playVader = function() {	
	this.play('sounds/imperial_march.wav')
};

module.exports.playXP = function() {	
	this.play('sounds/xp.wav')
};

module.exports.playCrystal = function() {	
	this.play('sounds/crystal.wav')
};

module.exports.playDrWho = function() {	
	this.play('sounds/drwho.wav')
};

module.exports.playHitchhickers = function() {	
	this.play('sounds/hitchhickers.wav')
};

module.exports.play = function(file) {	
	var cmd = 'sudo aplay ' + __dirname + '/' + file
	exec(cmd, function() {    
		console.log(cmd);
    });
};
