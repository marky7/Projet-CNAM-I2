

console.log('STARTS RABBIT MQ INITIALISATION');
console.log('------------------------');

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


//**************************************** MAIN FUNCTION ****************************************//


 function refreshData(){

    acquisitionToString = '{"storageArea":{"address":"118_Route de Narbonne, 31400 Toulouse","description":"IPST-CNAM","isMobile":"false"},"tags":[{"creationDate":"2018-10-12T18:17:39.993Z","value":"9842", "tagId":9842}],"measures":[{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"NH3","description":"ammoniac","value":2.872149,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"C0","description":"carbon_monoxide","value":34.3923,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"NO2","description":"nitrogen_dioxide","value":0.298846,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"C3H8","description":"propane","value":5002.136,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"C4H10","description":"butane","value":2516.637,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"CH4","description":"methane","value":1314815,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"H2","description":"dihydrogen","value":17.08261,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"gas","name":"C2H5OH","description":"ethanol","value":24.58287,"unit":"ppm"},{"creationDate":"2018-10-12T18:17:39.993Z","type":"temperatureHumidity","temperature":03.3,"temperatureUnit":"*C","humidity":66.9,"humidityUnit":"%"}]}'


//**************************************** Send message with AMQP ****************************************//

var q = 'file3';

function bail(err) {
  console.error(err);
  process.exit(1);
}

// Publisher
function publisher(conn) {
    console.log('------------------------------------------------------------------------------------------------------------------------------------------------------------------');
    console.log('Création du canal "Exchange" et envoi du message : ')
    console.log(acquisitionToString);
    conn.createChannel(on_open);
  function on_open(err, ch) {
    if (err != null) bail(err);
    ch.assertQueue(q);
    ch.sendToQueue(q, Buffer.from(acquisitionToString));
    console.log('Envoi du message réussi! Fermetrue de la connexion')
    console.log('------------------------------------------------------------------------------------------------------------------------------------------------------------------');
  }
}

require('amqplib/callback_api')
  .connect('amqp://172.17.0.2:5672', function(err, conn) {
    if (err != null) bail(err);
    publisher(conn);
  });
    a++;
    setTimeout(refreshData, timer*1000);
}


setTimeout(refreshData, timer*1000); // Execute function


