var SerialPort = require('serialport');

var serialPort = new SerialPort('/dev/ttyUSB0', {
  baudRate: 115200
});


// it opens the connection and register an event 'data'
serialPort.on("open", function () {
  console.log('Communication is on!');

  // when your app receives data, this event is fired
  // so you can capture the data and do what you need
  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
  });
});

