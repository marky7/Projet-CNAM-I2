package com.tracability.model;

import java.util.Date;
import java.util.HashMap;

public class Measures {
	private Date creationDate;
	private double temperatureValue;
	private double humidityValue;
	private HashMap<String, Double> gasValue;
	
	public Measures(Date creationDate, double temperatureValue, double humidityValue, HashMap gasValue) {
		super();
		this.creationDate = creationDate;
		this.temperatureValue = temperatureValue;
		this.humidityValue = humidityValue;
		this.gasValue = gasValue;
	}
	@Override
	public String toString() {
		return "Measures [creationDate=" + creationDate + ", temperatureValue=" + temperatureValue + ", humidityValue="
				+ humidityValue + ", gasValue=" + gasValue + "]";
	}
	public Date getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}
	public double getTemperatureValue() {
		return temperatureValue;
	}
	public void setTemperatureValue(double temperatureValue) {
		this.temperatureValue = temperatureValue;
	}
	public double getHumidityValue() {
		return humidityValue;
	}
	public void setHumidityValue(double humidityValue) {
		this.humidityValue = humidityValue;
	}
	public HashMap getGasValue() {
		return gasValue;
	}
	public void setGasValue(HashMap gasValue) {
		this.gasValue = gasValue;
	}
	
}
