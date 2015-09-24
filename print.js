var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyAMA0", {
  baudrate: 19200
});


serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
  });
  serialPort.write("hello world\n\n\n", function(err, results) {
    console.log('err ' + err);
    console.log('results ' + results);
  });
});
