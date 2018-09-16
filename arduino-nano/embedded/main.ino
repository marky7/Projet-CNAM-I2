#include <Wire.h>
#include <MutichannelGasSensor.h>
#include <DHT.h>

#define DHTPIN 2 // Declaration du pin du DHT
#define DHTTYPE DHT22 // DHT 22
DHT dht(DHTPIN, DHTTYPE); // Initialisation du capteur

void setup()
{
  // Arduino Nano
  // SDA -> A4
  // SCL -> A5
  Serial.begin(115200);  // start serial for output
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
