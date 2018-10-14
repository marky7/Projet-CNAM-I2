package com.tracability.model;

import java.util.Date;
import java.util.List;

public class Gas extends Measures {
	private double value;
	private String name;
	private String description;
	private String unit;
	
	public Gas(String creationDate, String type, List<Package> packages, double value, String name, String description,
			String unit) {
		super(creationDate, type, packages);
		this.value = value;
		this.name = name;
		this.description = description;
		this.unit = unit;
	}
	@Override
	public String toString() {
		return "Gas [value=" + value + ", name=" + name + ", description=" + description + ", unit=" + unit + "]";
	}
	public double getValue() {
		return value;
	}
	public void setValue(double value) {
		this.value = value;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	

}
