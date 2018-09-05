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


var getNow = function(){
    return new Date().toISOString();
}

//**************************************** DEFAULT DATA ****************************************//
// Create Default DATA to send via RabbitMQ


// Bluetooth Devices detected
var createBluetoothDevicesDetected = function(){
    return ['adresse_mac_detectee_1','adresse_mac_detectee_2','adresse_mac_detectee_3'];
}

// Temperature and Humidity detected
var createTemperatureHumidity = function(){
    var creationDate = getNow();
    return {temperature:25, temperatureUnit:'°C', humidity:35, humidityUnit:'%', creationDate:creationDate};
}

// Gaz Detected
var createMeasuredGas = function(){
    var creationDate = getNow();
    return [{name:'CO2',description:'',value:'1',unit:'%',creationDate:creationDate},{name:'O2',description:'',value:'50',unit:'%',creationDate:creationDate}];
}


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

