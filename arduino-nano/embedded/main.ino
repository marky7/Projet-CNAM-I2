#include <Wire.h>
#include <MutichannelGasSensor.h>
#include <DHT.h>
#include <string.h>
#include <ArduinoJson.h>

#define DHTPIN 2 // Declaration du pin du DHT
#define DHTTYPE DHT22 // DHT 22
DHT dht(DHTPIN, DHTTYPE); // Initialisation du capteur


void setup()
{
  Serial.begin(115200);  // start serial for output

  // Arduino Nano
  // SDA -> A4
  // SCL -> A5
  // Serial.println("Power on!");
  gas.begin(0x04);//the default I2C address of the slave is 0x04
  gas.powerOn();
  // Serial.print("Firmware Version = ");
  // Serial.println(gas.getVersion());
  dht.begin();
  // Pause en début pour laisser le temps au capteur dht de démarrer
  delay(5000);
}


void insertGas(JsonArray &measures, char* type, unsigned long *clock_time, float value,char* gasname, char* gasdesc, char* gasunit){
  // Insert Gas in array in measures array
  JsonObject& currentGas = measures.createNestedObject();
  currentGas["creationDate"] = clock_time;
  currentGas["type"] = type;
  currentGas["name"] = gasname;
  currentGas["description"] = gasdesc;
  currentGas["value"] = value;
  currentGas["unit"] = gasunit;
}


void insertTeamperatureHumidity(JsonArray &measures, char* type, unsigned long *ct, float h, char* hUnit, float t, char* tUnit){
  // Create temperature humidity in measures array
  JsonObject& temperatureHumidityM = measures.createNestedObject();
  temperatureHumidityM["creationDate"] = ct;
  temperatureHumidityM["type"] = 'temperatureHumidity';
  temperatureHumidityM["temperature"] = t;
  temperatureHumidityM["temperatureUnit"] = tUnit;
  temperatureHumidityM["humidity"] = h;
  temperatureHumidityM["humidityUnit"] = hUnit;
}


void loop()
{
  DynamicJsonBuffer jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  unsigned long clock_time_t = millis();
  printf("%f",clock_time_t);
  unsigned long* pclock_time_t = millis();

  // Create the FixedPlace and insert in root
  JsonObject& fixedPlace = root.createNestedObject("fixedPlace");
  fixedPlace["address"] = "118_Route de Narbonne, 31400 Toulouse";
  fixedPlace["description"] = "IPST-CNAM";
  fixedPlace["isMobile"] = "false";

  // Create tags array and insert in root
  JsonArray& tagsM = root.createNestedArray("tags");
  // PATCH : Insert a default tag inside  
  JsonObject& tagM1 = tagsM.createNestedObject();
  tagM1["creationDate"] = clock_time_t;
  tagM1["value"] = "Adresse_mac1";
  tagM1["name"] = "Colis1";

  // Create gas array
  JsonArray& measures = root.createNestedArray("measures");


  // Fill gas array
  float c;

  c = gas.measure_NH3();
  if (c >= 0) {insertGas(measures, "gas", pclock_time_t, c, "NH3", "ammoniac", "ppm");}
  
  c = gas.measure_CO();
  if (c >= 0) {insertGas(measures, "gas", pclock_time_t, c, "C0", "carbon_monoxide", "ppm");}

  c = gas.measure_NO2();
  if (c >= 0) {insertGas(measures, "gas", pclock_time_t, c, "NO2", "nitrogen_dioxide", "ppm");}
  
  c = gas.measure_C3H8();
  if (c >= 0) {insertGas(measures, "gas", pclock_time_t, c, "C3H8", "propane", "ppm");}

  c = gas.measure_C4H10();
  if (c >= 0) {insertGas(measures, "gas", pclock_time_t, c, "C4H10", "butane", "ppm");}

  c = gas.measure_CH4();
  if (c >= 0) {insertGas(measures, "gas", pclock_time_t, c, "CH4", "methane", "ppm");}

  c = gas.measure_H2();
  if (c >= 0) {insertGas(measures, "gas", pclock_time_t, c, "H2", "dihydrogen", "ppm");}

  c = gas.measure_C2H5OH();
  if (c >= 0) {insertGas(measures, "gas", pclock_time_t, c, "C2H5OH", "ethanol", "ppm");}



  // ---------------------------------------- //
  // ----- Get Humidity and Temperature ----- //
  // ---------------------------------------- //

  float h = dht.readHumidity();
  float t = dht.readTemperature();

  //insertTeamperatureHumidity(measures, "temperatureHumidity", pclock_time_t, h, "%", t, "*C");

  
  root.printTo(Serial);
  Serial.println();
  delay(5000);

}

// RAM errors see : https://arduinojson.org/v5/faq/why-some-parts-are-missing/
// https://arduinojson.org/v5/assistant/
