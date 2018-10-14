package com.tracability.model;

import java.util.Date;

public class Tag {
	String id;
	String value;
	Date creationDate;
	public Tag(String id, String value, Date creationDate) {
		super();
		this.id = id;
		this.value = value;
		this.creationDate = creationDate;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public Date getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}
	

}
