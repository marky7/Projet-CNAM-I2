package com.tracability.model;

import java.util.Date;
import java.util.List;

public class Package {
	private long id;
	private String description;
	private Provider provider;
	private Customer customer;
	private List<Product> products;
	private Date deleveryDate;
	private List<Attachment> attachments;
	private Tag tag;
	private Date creationDate;
	
	public Package(long id, String description, Provider provider, Customer customer, List<Product> products,
			Date deleveryDate, List<Attachment> attachments, Tag tag, Date creationDate) {
		super();
		this.id = id;
		this.description = description;
		this.provider = provider;
		this.customer = customer;
		this.products = products;
		this.deleveryDate = deleveryDate;
		this.attachments = attachments;
		this.tag = tag;
		this.creationDate = creationDate;
	}
	@Override
	public String toString() {
		return "Package [id=" + id + ", description=" + description + ", provider=" + provider + ", customer="
				+ customer + ", products=" + products + ", deleveryDate=" + deleveryDate + ", attachments="
				+ attachments + ", tag=" + tag + ", creationDate=" + creationDate + "]";
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Provider getProvider() {
		return provider;
	}
	public void setProvider(Provider provider) {
		this.provider = provider;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public List<Product> getProducts() {
		return products;
	}
	public void setProducts(List<Product> products) {
		this.products = products;
	}
	public Date getDeleveryDate() {
		return deleveryDate;
	}
	public void setDeleveryDate(Date deleveryDate) {
		this.deleveryDate = deleveryDate;
	}
	public List<Attachment> getAttachments() {
		return attachments;
	}
	public void setAttachments(List<Attachment> attachments) {
		this.attachments = attachments;
	}
	public Tag getTag() {
		return tag;
	}
	public void setTag(Tag tag) {
		this.tag = tag;
	}
	public Date getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}
	
}
