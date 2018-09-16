

console.log('INITIALISATION DU PROTOCOLE AMQP : un message va être envoyé TOUTE les 5 secondes...');
console.log('------------------------------------------------------------------------------------------------------------------------------------------------------------------');

//**************************************** DEFAULT DATA ****************************************//
// Iterator : Message number
var a = 0;
// Tags
var tags = [];
// Gaz 1
var gaz1;
// Gaz 2
var gaz2;
// Temperature and Humidty
var temperatureHumidity;
// Mac Adress
var macAdresses;
// Json object with measures
var acquisition;
// Casting into string to communicate with AMQP
var acquisitionToString;
// Timer for iterating
timer = 3; // 3 seconds

//**************************************** DEFAULT DATA ****************************************//

// About time?
var getNow = function(){
    return new Date().toISOString();
};

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

// ******************************************************** MAIN FUNCTION ************************************************************************* //
// ************************************************************************************************************************************************ //

 function refreshData(){
// **************************************************** CATCH DATA FROM ARDUINO ****************************************************
    gaz1 = new Gaz('CO2','1','%');
    gaz2 = new Gaz('O2','25','%');
    temperatureHumidity = new TemperatureHumidity(25,'°C',30,'%');
    macAdresses = ['adresse_mac_detectee_1','adresse_mac_detectee_2','adresse_mac_detectee_3'];
    // Create Tags
    for(var i=0;i<macAdresses.length;i++){
       tags.push(new Tag(macAdresses[i]));
    } 
    acquisition = new Acquisition([gaz1,gaz2,temperatureHumidity],tags);
// *********************************************************************************************************************************
// **************************************************** CASTING DATA INTO JSON *****************************************************
    console.log('Création du message au format String!');
    acquisitionToString = JSON.stringify(acquisition);
    console.log('------------------------------------------------------------------------------------------------------------------------------------------------------------------');

// *********************************************************************************************************************************
console.log('Formatage en chaine de caractère réussi!');
// **************************************************** Send message with AMQP******************************************************
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';
    var msg = 'Hello World!';

    ch.assertQueue(q, {durable: false});
    ch.sendToQueue(q, Buffer.from(acquisitionToString));
    console.log(" [x] Sent %s", acquisitionToString);
  });
  setTimeout(function() { conn.close();
console.log('------------------------------------- Fermeture de la connexion------------------------------------------------'); }, 500);
});
    a++;
    setTimeout(refreshData, timer*1000);
}
// ************************************************************************************************************************************************ //
// ************************************************************************************************************************************************ //


refreshData(); // execute function



