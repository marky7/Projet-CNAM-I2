package com.tracability.model;

import java.util.Date;
import java.util.List;

public class TemperaturesHumidity extends Measures {
	private double temperature;
	private String temperatureUnit;
	
	private double humidity;
	private String humidityUnit;

	public TemperaturesHumidity(String creationDate, String type, List<Package> packages, double temperature,
			String temperatureUnit, double humidity, String humidityUnit) {
		super(creationDate, type, packages);
		this.temperature = temperature;
		this.temperatureUnit = temperatureUnit;
		this.humidity = humidity;
		this.humidityUnit = humidityUnit;
	}
	public double getTemperature() {
		return temperature;
	}
	public void setTemperature(double temperature) {
		this.temperature = temperature;
	}
	public String getTemperatureUnit() {
		return temperatureUnit;
	}
	public void setTemperatureUnit(String temperatureUnit) {
		this.temperatureUnit = temperatureUnit;
	}
	public double getHumidity() {
		return humidity;
	}
	public void setHumidity(double humidity) {
		this.humidity = humidity;
	}
	public String getHumidityUnit() {
		return humidityUnit;
	}
	public void setHumidityUnit(String humidityUnit) {
		this.humidityUnit = humidityUnit;
	}
	

}
