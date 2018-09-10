//var SerialPort = require('serialport');

//var serialPort = new SerialPort('/dev/ttyUSB0', {
// baudRate: 115200
//});

// it opens the connection and register an event 'data'
//serialPort.on("open", function () {
// console.log('Communication is on!');

// when your app receives data, this event is fired
// so you can capture the data and do what you need
// serialPort.on('data', function(data) {
// console.log('data received: ' + data);
// });
//});


console.log('Initialisation du protocole AMQP : un message va être envoyé toute les 5 secondes...');
a = 0;
function refreshData()
{
    x = 5;  // 5 Seconds
    console.log('---------------------------------------------------DEBUT-------------------------------------------------------');
    console.log('Envoi du message numéro : '+a);
    // Do your thing here
    a++;


var getNow = function(){
    return new Date().toISOString();
};

//**************************************** DEFAULT DATA ****************************************//
// Create Default DATA to send via RabbitMQ

function FixedPlace(place,description){
    this.address = place;
    this.description = description;
    this.isMobile = false;
    this.creationDate = getNow();
}

// Temperature and Humidity detected
function TemperatureHumidity(temperature,temperatureUnit,humidity,humidityUnit){
    this.type = 'temperatureHumidity';
    this.creationDate = getNow();
    this.temperature = temperature;
    this.temperatureUnit = temperatureUnit;
    this.humidity = humidity;
    this.humidityUnit = humidityUnit;
}

// Gaz Detected
function Gaz(name,value,unit,description){
    this.type = 'gaz';
    this.name = name;
    this.value = value;
    this.unit = unit;
    this.creationDate = getNow();
    this.description = description;
}

function Acquisition(measures,tags){
    this.creationDate = getNow();
    this.storageArea = '';
    this.measures= measures;
    this.tags= tags;
}

function Tag(valeur){
    this.valeur = valeur;
    this.creationDate = getNow();
}

var tags = [];

var gaz1 = new Gaz('CO2','1','%');
var gaz2 = new Gaz('O2','25','%');
var temperatureHumidity = new TemperatureHumidity(25,'°C',30,'%');
var macAdresses = ['adresse_mac_detectee_1','adresse_mac_detectee_2','adresse_mac_detectee_3'];

// Create Tags
for(var i=0;i<macAdresses.length;i++){
   tags.push(new Tag(macAdresses[i]));
}


var acquisition = new Acquisition([gaz1,gaz2,temperatureHumidity],tags);
var acquisitionToString = JSON.stringify(acquisition);
console.log('---------------------------------------------------------------------------------');
console.log('Création du message au format String');
console.log('---------------------------------------------------------------------------------');
console.log(acquisitionToString);
console.log('---------------------------------------------------------------------------------');
var queue = 'fileDesMessages';



function bail(err) {
  console.error(err);
  process.exit(1);
}

// Publisher
function publisher(conn) {
  conn.createChannel(on_open);
  function on_open(err, ch) {
    if (err != null) bail(err);
    ch.assertQueue(queue);
console.log('Création de la queue : '+queue);
console.log('---------------------------------------------------------------------------------');
    ch.sendToQueue(queue, Buffer.from(acquisitionToString));
console.log('Envoi du message dans la queue nommée : '+queue);
console.log('---------------------------------------------------------------------------------');
console.log('Fin de la transmission. Vérifiez si le consommateur a reçu le message');
console.log('--------------------------------------------------FIN------------------------------------------------------');


  }
}

 
require('amqplib/callback_api')
  .connect('amqp://localhost', function(err, conn) {
    if (err != null) bail(err);
    publisher(conn);
  });

setTimeout(refreshData, x*1000);
}


refreshData(); // execute function



