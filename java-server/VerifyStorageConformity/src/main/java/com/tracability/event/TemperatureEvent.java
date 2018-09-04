package com.tracability.event;

public class TemperatureEvent implements Event{
	private Double temperature;

	public Double getTemperature() {
		return temperature;
	}

	public void setTemperature(Double temperature) {
		this.temperature = temperature;
	}
}
