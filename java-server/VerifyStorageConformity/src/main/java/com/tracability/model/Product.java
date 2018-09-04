package com.tracability.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Product {
	private long id;
	private String label;
	private String description;
	private ProductProfile productProfil;
	private Date creationDate;
	
	
	public Product(long id, String label, String description, ProductProfile productProfil, Date creationDate) {
		super();
		this.id = id;
		this.label = label;
		this.description = description;
		this.productProfil = productProfil;
		this.creationDate = creationDate;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public ProductProfile getProductProfil() {
		return productProfil;
	}
	public void setProductProfil(ProductProfile productProfil) {
		this.productProfil = productProfil;
	}
	public Date getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}
	@Override
	public String toString() {
		return "Product [id=" + id + ", label=" + label + ", description=" + description + ", productProfil="
				+ productProfil + ", creationDate=" + creationDate + "]";
	}
	public static List<Product> getProductFromPackageId(String string) {
		/*Requete get product from package id */
		List<Product> p = new ArrayList<Product>();
		int nb_product = 2; /*Nb row requete*/
		int i;
		for(i=0;i<2;i++) {
			ProductProfile profil = ProductProfile.getProductProfilFromId("idprofil");
			Product product = new Product(i,"Viande","10 kilos de viande", profil, new Date());
			p.add(product);
		}
		
		return p;
	}
	
	
}
