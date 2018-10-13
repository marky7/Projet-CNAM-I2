var SerialPort = require('serialport');

var part = 1;
var curAcquisitionString = "";
var lastAcquisition = {};
var device = '/dev/ttyS0';

var serialPort = new SerialPort(device, {
  baudRate: 115200
});

var totalParts = 5;
var parts = [];

var unusedFrames = ['\"version = 2\\r\\n\"'];
var initFrame = '{\\\"stora';

var q = 'file3';
var init = true;

var mergeObjects = function(parts){
  var fullObject;
  for(var i=0; i<parts.length; i++){
    if(i===0){
      fullObject = parts[i];
    } else {
      fullObject.measures = fullObject.measures.concat(parts[i].measures);
    }
  }
  return fullObject;
};

var insertCreationDatesInAcquisition = function(acquisition){
  var date = new Date();
  for(var i=0; i<acquisition.measures.length; i++){
    acquisition.measures[i].creationDate = date;
  }
  for(var j=0; j<acquisition.tags.length; j++){
    acquisition.tags[j].creationDate = date;
  }
  return acquisition;
};


console.log('Try to connect on serial Port communication with '+device+' !');

// it opens the connection and register an event 'data'
serialPort.on("open", function () {
  curAcquisitionString = '';
  init = true;
  var counter = 0;

  console.log('Serial Port communication with '+device+' is on !');

  // when your app receives data, this event is fired
  // so you can capture the data and do what you need

  serialPort.on('data', function(data) {

    // Remove first buffer frames
    if(data.length>100 && init){
      return;
    } else {
      init = false;
    }

    data_str = JSON.stringify(''+data);

    // console.log(++counter,' ---Get_DATA--- longueur data : '+data_str.length,' -------- longueur acquisitionString : '+curAcquisitionString.length);

    // Remove unused trams
    for(var i=0; i<unusedFrames.length; i++){
        if(data_str === unusedFrames[i]){
          data_str = ''; 
        }
    }

    // Remove first and last double quote for each tram
    if(data_str!= null && data_str.length >= 2){
      data_str = data_str.substring(1, data_str.length-1);
    }

    // We assemble the different frames
    if(data_str.substr(0, 9) === initFrame){
        curAcquisitionString = data_str;
    } else {
        curAcquisitionString = curAcquisitionString+''+data_str;
    }

    // Replace each \" by " in curAcquisitionString
    curAcquisitionString = curAcquisitionString.replace(/\\"/g, "\"");

    // Here we try to parse the JSON object to test if it is completed
    // Then we send it to RabbitMQ
    // Then We can try to get an other JSON object from new frames

    try {
    
        var lastAcquisition = JSON.parse(curAcquisitionString);
        parts.push(lastAcquisition);
        if(parts.length === totalParts){
          var fullObject = mergeObjects(parts);
          fullObject = insertCreationDatesInAcquisition(fullObject);
          var fullObjectStringify = JSON.stringify(fullObject);

          console.log('Acquisition object received via SerialPort from '+device);
	  console.log('-----------------------------------------------------------');
          console.log(fullObjectStringify);
	  console.log('-----------------------------------------------------------');
      
          sendObjectToRabbitMq(fullObjectStringify);
          parts = [];
        }
        curAcquisitionString = "";
    }
    catch(error) {
      // The object is not completed - Continue
    }

  });
});





//**************************************** DEFAULT DATA ****************************************//


// Casting into string to communicate with AMQP
var acquisitionToString;


 function sendObjectToRabbitMq(objectToString){

    acquisitionToString = '{"storageArea":{"address":"118_Route de Narbonne, 31400 Toulouse","description":"IPST-CNAM","isMobile":"false"},"tags":[{"creationDate":"2018-10-12T18:17:39.993Z","value":"Adresse_mac1","name":"Colis1"}],"measures":[{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"NH3","description":"ammoniac","value":2.872149,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"C0","description":"carbon_monoxide","value":34.3923,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"NO2","description":"nitrogen_dioxide","value":0.298846,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"C3H8","description":"propane","value":5002.136,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"C4H10","description":"butane","value":2516.637,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"CH4","description":"methane","value":1314815,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"H2","description":"dihydrogen","value":17.08261,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"C2H5OH","description":"ethanol","value":24.58287,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"temperatureHumidity","temperature":24.3,"temperatureUnit":"*C","humidity":66.9,"humidityUnit":"%"}]}';
    // If no one object is created add a default one - Temporary
    objectToString = objectToString || acquisitionToString;


    //**************************************** Send message with AMQP ****************************************//


    function bail(err) {
      console.error(err);
      process.exit(1);
    }

    // Publisher
    function publisher(conn) {
      // Channel creation and message send
      conn.createChannel(on_open);
      function on_open(err, ch) {
        if (err != null) bail(err);
        ch.assertQueue(q);
        ch.sendToQueue(q, Buffer.from(acquisitionToString));
        console.log('Acquisition object sent on RabbitMQ on queue : '+q);
        // Message sent, connection closed
      }
    }

    console.log('Try to create a connection on RabbitMQ to send Acquisition');

    require('amqplib/callback_api')
      .connect('amqp://172.17.0.2:5672', function(err, conn) {
        if (err != null) {bail(err);} else {
          console.log('Connection is created on RabbitMQ');
        }
        
        publisher(conn);
      });
}

