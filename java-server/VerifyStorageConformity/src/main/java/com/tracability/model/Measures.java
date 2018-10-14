package com.tracability.model;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

public class Measures {
	
	private String creationDate;
	private String  type;
	private List<Package> packages;
	
	public Measures(String creationDate, String type, List<Package> packages) {
		super();
		this.creationDate = creationDate;
		this.type = type;
		this.packages = packages;
	}
	public String getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(String creationDate) {
		this.creationDate = creationDate;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public List<Package> getPackages() {
		return packages;
	}
	public void setPackages(List<Package> packages) {
		this.packages = packages;
	} 
	
	
	
}
