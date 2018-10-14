package com.tracability.model;

import java.util.List;

public class Acquisition {
	private String id;
	private StorageArea storageArea;
	private List<Measures> measures; 
	private List<Tag> tags;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public StorageArea getStorageArea() {
		return storageArea;
	}
	public void setStorageArea(StorageArea storageArea) {
		this.storageArea = storageArea;
	}
	
	public List<Measures> getMeasures() {
		return measures;
	}
	public void setMeasures(List<Measures> measures) {
		this.measures = measures;
	}
	public List<Tag> getTags() {
		return tags;
	}
	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}
	

}
