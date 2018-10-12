var SerialPort = require('serialport');
var part = 1;
var curAcquisition = "";
var lastAcquisition = {};
var serialPort = new SerialPort('/dev/ttyUSB0', {
  baudRate: 115200
});

var defaultAcquistion = '{"storageArea":{"address":"118_Route de Narbonne, 31400 Toulouse","description":"IPST-CNAM","isMobile":"false"},"tags":[{"creationDate":"2018-10-12T18:17:39.993Z","value":"Adresse_mac1","name":"Colis1"}],"measures":[{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"NH3","description":"ammoniac","value":2.872149,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"C0","description":"carbon_monoxide","value":34.3923,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"NO2","description":"nitrogen_dioxide","value":0.298846,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"C3H8","description":"propane","value":5002.136,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"C4H10","description":"butane","value":2516.637,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"CH4","description":"methane","value":1314815,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"H2","description":"dihydrogen","value":17.08261,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"C2H5OH","description":"ethanol","value":24.58287,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"temperatureHumidity","temperature":24.3,"temperatureUnit":"*C","humidity":66.9,"humidityUnit":"%"}]}'
var totalParts = 5;
var parts = [];

var unusedFrames = ['\"version = 2\\r\\n\"'];
var initFrame = '{\\\"stora';


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


// it opens the connection and register an event 'data'
serialPort.on("open", function () {
  console.log('Communication is on!');

  // when your app receives data, this event is fired
  // so you can capture the data and do what you need

  serialPort.on('data', function(data) {

    data = JSON.stringify(''+data);

    // Remove unused trams
    for(var i=0; i<unusedFrames.length; i++){
        if(data === unusedFrames[i]){
          data = ''; 
        }
    }

    // Remove first and last double quote for each tram
    if(data!= null && data.length >= 2){
        data = data.substring(1, data.length-1);
    }

    // We assemble the different frames
    if(data.substr(0, 9) === initFrame){
        curAcquisition = data;
    } else {
        curAcquisition = curAcquisition+''+data;
    }

    // Replace each \" by " in curAcquisition string
    curAcquisition = curAcquisition.replace(/\\"/g, "\"");


    // Here we try to parse the JSON object to test if it is completed
    // Then we send it to RabbitMQ
    // Then We can try to get an other JSON object from new frames

    try {
        var lastAcquisition = JSON.parse(curAcquisition);

        parts.push(lastAcquisition);
        if(parts.length === totalParts){
          var fullObject = mergeObjects(parts);
          fullObject = insertCreationDatesInAcquisition(fullObject);
          // sendObjectToRabbitMq();
          console.log('Acquisition_data');
          console.log(JSON.stringify(fullObject));
          parts = [];
        }
        curAcquisition = "";  
      
    }
    catch(error) {
      // The object is not completed - Continue
    }

  });
});



