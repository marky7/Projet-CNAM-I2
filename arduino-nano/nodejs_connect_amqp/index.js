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
<<<<<<< HEAD
=======


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
};

// Temperature and Humidity detected
function TemperatureHumidity(temperature,temperatureUnit,humidity,humidityUnit){
    this.type = 'temperatureHumidity';
    this.creationDate = getNow();
    this.temperature = temperature;
    this.temperatureUnit = temperatureUnit;
    this.humidity = humidity;
    this.humidityUnit = humidityUnit;
};

// Gaz Detected
function Gaz(name,value,unit,description){
    this.type = 'gaz';
    this.name = name;
    this.value = value;
    this.unit = unit;
    this.creationDate = getNow();
    this.description = description;
};

var gaz1 = new Gaz('CO2','1','%');
var gaz2 = new Gaz('O2','25','%');
var temperatureHumidity = new TemperatureHumidity(25,'°C',30,'%');
var bluetoothDevicesDetected = ['adresse_mac_detectee_1','adresse_mac_detectee_2','adresse_mac_detectee_3'];

function Acquisition(measures,tags){
    this.creationDate = getNow();
    this.storageArea = '';
    this.measures: measures;
    this.tags: tags;
};

function Tag(){
    
}

var acquisition = new Acquisition([gaz1,gaz2,temperatureHumidity]);

>>>>>>> 8722397e96a0d1640f5fc726100047c570f27936
//**************************************** ALEXIS ****************************************//
// Message à envoyer
var messageToSent;
// Instanciation des données reçues de l'arduino
// Tag bluetooth du colis
var id = 1574581;
// Chargement du message
messageToSent.concat(id);

// Nous ne pouvons pas anticiper comment les mesures seront envoyées
// Sinon, il faudrait reconnaître le type de colis que c'est avant de push les mesures
// sur le canal de communication AMQP
// Nous allons donc trancher : chaque message envoyé au serveur J2E par le biais d'AMQP
// se composera toujours d'un ID (le colis)
// Avec celles-ci, nous ferons un message de type:
// idColis;NomMesure1:ValeurMesure1;NomMesure2:ValeurMesure2;NomMesure3:ValeurMesure3...
// Si une viande a besoin qu'on contrôle la température, l'humidité et le méthane
// Cela donnera (On admet que la viande possède le numéro de colis 000001):
// var messageAEnvoyer : "000001;Temperature:19.4;Humidity:94;CH4:54"

// ICI, traitement des mesures reçues par l'Arduino, tout à FALSE
var TemperatureExist = false;
var HumidityExist = false
var NH3Exist = false;
var CommentNO2Exist = false;
var C3H8Exist = false;
var C4H10Exist = false;
var CH4Exist = false;
var H2Exist = false;
var C2H50HExist = false;

// Si une température est reçue, tu passes à true + rajout de la valeur dans le string
// If Arduino m'envoie une mesure de température then Temperature = "37.00"
if (temperatureExist =true){
var Temperature = "Temperature:TU REMPLACES CETTE PHRASE EN MAJUSCULE PAR LA VALEUR RECU PAR LARDUINO";
// On rajoute toujours un ";" dans un appel de concat, comme ça, il n'y aura que des points virgules ajoutés à la string
// uniquement si une mesure va être insérée dans le message
messageToSent.concat(";",Temperature);
// Notre message sera donc messageToSent ="1574581;Temperature:37.00"
}

// Apparement, require ne s'utilise plus avec ECMAScript, il faudrait faire un import.
var amqp = require('amqplib/callback_api');

// Création de la connexion
amqp.connect('amqp://localhost', function(err, conn) {
// Création de la queue
conn.createChannel(function(err, ch) {
// Nommage de la queue
var queue = 'FileDesMessages';
// Insertion
ch.assertQueue(queue, {durable: false});
// Envoie du message (messageToSent)
ch.sendToQueue(queue, Buffer.from(messageToSent));
console.log(" [x] Sent %s", messageToSent);
});
setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
//**************************************** ALEXIS ****************************************//

