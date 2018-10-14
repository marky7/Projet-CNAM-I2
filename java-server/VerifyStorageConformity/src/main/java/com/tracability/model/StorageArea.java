package com.tracability.model;

import java.util.Date;

public class StorageArea {
	private String Id;
	private boolean isMobil;
	public StorageArea(String id, boolean isMobil, Date creationDate) {
		super();
		Id = id;
		this.isMobil = isMobil;
		this.creationDate = creationDate;
	}
	@Override
	public String toString() {
		return "StorageArea [Id=" + Id + ", isMobil=" + isMobil + ", creationDate=" + creationDate + "]";
	}
	private Date creationDate;
	public String getId() {
		return Id;
	}
	public void setId(String id) {
		Id = id;
	}
	public boolean isMobil() {
		return isMobil;
	}
	public void setMobil(boolean isMobil) {
		this.isMobil = isMobil;
	}
	public Date getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}
	

}
