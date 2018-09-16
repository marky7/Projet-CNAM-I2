#include <Wire.h>
#include <MutichannelGasSensor.h>
#include <DHT.h>
#include <string.h>
#include <ArduinoJson.h>

#define DHTPIN 2 // Declaration du pin du DHT
#define DHTTYPE DHT22 // DHT 22
DHT dht(DHTPIN, DHTTYPE); // Initialisation du capteur


/*
class FixedPlace{
    String address;
    String description;
    boolean isMobile;
    String creationDate;
    
    FixedPlace(String place, String description){
      address = place;
      description = description;
      isMobile = false;
    }
};


// Temperature and Humidity detected
Class TemperatureHumidity(temperature,temperatureUnit,humidity,humidityUnit){
    this.type = 'temperatureHumidity';
    this.creationDate = getNow();
    this.temperature = temperature;
    this.temperatureUnit = temperatureUnit;
    this.humidity = humidity;
    this.humidityUnit = humidityUnit;
}

// Gaz Detected
Class Gaz(name,value,unit,description){
    float value;

  
    this.type = 'gaz';
    this.name = name;
    this.value = value;
    this.unit = unit;   
    this.creationDate = getNow();
    this.description = description;
}

Class Acquisition(measures,tags){
    this.creationDate = getNow();
    this.storageArea = '';
    this.measures= measures;
    this.tags= tags;
}

Class Tag(valeur){
    string valeur = valeur;
    Date creationDate = getNow();
}





*/





void setup()
{
  Serial.begin(115200);  // start serial for output

  // Initialise default data
  StaticJsonBuffer<1000> acquisitionJsonBuffer;
  StaticJsonBuffer<200> fixedPlaceJsonBuffer;
  StaticJsonBuffer<200> gasJsonBuffer;
  StaticJsonBuffer<200> temperatureHumidityJsonBuffer;
  StaticJsonBuffer<200> tagJsonBuffer;
  

  JsonObject& fixedPlace = fixedPlaceJsonBuffer.createObject();
  fixedPlace["address"] = "118_Route de Narbonne, 31400 Toulouse";
  fixedPlace["description"] = "IPST-CNAM";
  fixedPlace["isMobile"] = "false";
/*
  JsonObject& temperatureHumidityM = temperatureHumidityJsonBuffer.createObject();
  temperatureHumidityM["creationDate"] = millis();
  temperatureHumidityM["type"] = 'temperatureHumidity';
  temperatureHumidityM["temperature"] = "";
  temperatureHumidityM["temperatureUnit"] = "";
  temperatureHumidityM["humidity"] = "";
  temperatureHumidityM["humidityUnit"] = "";

  JsonObject& gasM = gasJsonBuffer.createObject();
  gasM["creationDate"] = millis();
  gasM["type"] = "gaz";
  gasM["name"] = "";
  gasM["description"] = "";
  gasM["value"] = false;
  gasM["unit"] = "gaz";

  JsonObject& tagM = tagJsonBuffer.createObject();
  tagM["creationDate"] = millis();
  tagM["value"] = "Adresse_mac1";
  tagM["name"] = "Colis1";



  JsonObject& acquisitionM = acquisitionJsonBuffer.createObject();
  acquisitionM["creationDate"] = millis();
  acquisitionM["storageArea"] = fixedPlace;
  JsonArray& acquisitionMmeasures = acquisitionM.createNestedArray("measures");
  acquisitionMmeasures.add(gasM);
  acquisitionMmeasures.add(tagM);
  JsonArray& acquisitionMtags = acquisitionM.createNestedArray("tags");
  acquisitionMtags.add(tagM);
*/
  fixedPlace.printTo(Serial);

/*
  unsigned long time;
  time = millis();
*/

  // Arduino Nano
  // SDA -> A4
  // SCL -> A5

  Serial.println("Power on!");
  gas.begin(0x04);//the default I2C address of the slave is 0x04
  gas.powerOn();
  Serial.print("Firmware Version = ");
  Serial.println(gas.getVersion());
  dht.begin();
  // Pause en début pour laisser le temps au capteur dht de démarrer
  delay(5000);
}

void loop()
{
  float c;

  c = gas.measure_NH3();
  Serial.print("The concentration of NH3 is ");
  if (c >= 0) Serial.print(c);
  else Serial.print("invalid");
  Serial.println(" ppm");

  c = gas.measure_CO();
  Serial.print("The concentration of CO is ");
  if (c >= 0) Serial.print(c);
  else Serial.print("invalid");
  Serial.println(" ppm");

  c = gas.measure_NO2();
  Serial.print("The concentration of NO2 is ");
  if (c >= 0) Serial.print(c);
  else Serial.print("invalid");
  Serial.println(" ppm");

  c = gas.measure_C3H8();
  Serial.print("The concentration of C3H8 is ");
  if (c >= 0) Serial.print(c);
  else Serial.print("invalid");
  Serial.println(" ppm");

  c = gas.measure_C4H10();
  Serial.print("The concentration of C4H10 is ");
  if (c >= 0) Serial.print(c);
  else Serial.print("invalid");
  Serial.println(" ppm");

  c = gas.measure_CH4();
  Serial.print("The concentration of CH4 is ");
  if (c >= 0) Serial.print(c);
  else Serial.print("invalid");
  Serial.println(" ppm");

  c = gas.measure_H2();
  Serial.print("The concentration of H2 is ");
  if (c >= 0) Serial.print(c);
  else Serial.print("invalid");
  Serial.println(" ppm");

  c = gas.measure_C2H5OH();
  Serial.print("The concentration of C2H5OH is ");
  if (c >= 0) Serial.print(c);
  else Serial.print("invalid");
  Serial.println(" ppm");



  // ---------------------------------------- //
  // ----- Get Humidity and Temperature ----- //
  // ---------------------------------------- //

  float h = dht.readHumidity();
  float t = dht.readTemperature();

  Serial.print("Humidity: ");
  Serial.print(h);
  Serial.print(" %t");
  Serial.print("Temperature: ");
  Serial.print(t);
  Serial.println(" *C ");

  delay(5000);

}
