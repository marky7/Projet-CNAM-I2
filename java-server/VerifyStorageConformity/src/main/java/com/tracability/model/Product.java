package com.tracability.model;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.tracability.main.Communication;

public class Product {
	private String id;
	private String label;
	private String description;
	private List<ProductProfile> productProfil;
	private String creationDate;
	
	
	

	public Product(String id, String label, String description, List<ProductProfile> productProfil,
			String creationDate) {
		super();
		this.id = id;
		this.label = label;
		this.description = description;
		this.productProfil = productProfil;
		this.creationDate = creationDate;
	}

	public List<ProductProfile> getProductProfil() {
		return productProfil;
	}

	public void setProductProfil(List<ProductProfile> productProfil) {
		this.productProfil = productProfil;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
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


	public String getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(String creationDate) {
		this.creationDate = creationDate;
	}
	@Override
	public String toString() {
		return "Product [id=" + id + ", label=" + label + ", description=" + description + ", productProfil="
				+ productProfil + ", creationDate=" + creationDate + "]";
	}
	
	public static Product getProductFromID(String id) throws IOException, ParseException {
		String JSONProduct=  Communication.get("http://localhost:3000/api/Product/" + id);
		JSONParser parser = new JSONParser();
		Object receptedValue = parser.parse(JSONProduct);
		JSONObject level1Pars = (JSONObject) receptedValue;
		
		/*Récupération des profiles*/
		  JSONArray profilID = (JSONArray) level1Pars.get("productProfile");
 		  List<ProductProfile> profil = new ArrayList<ProductProfile>();
 		  ProductProfile p;
 		  int i;
 		  for(i=0; i<profilID.size();i++) {
 			 p = ProductProfile.getProductProfilFromId((profilID.get(i).toString().split("#"))[1]);
 		     profil.add(p);
 		   }
		//ProductProfile profile = ProductProfile.getProductProfilFromId(id);
		// TODO Auto-generated method stub
		return new Product(level1Pars.get("productId").toString(), level1Pars.get("label").toString(),level1Pars.get("description").toString(),profil,level1Pars.get("creationDate").toString());
	}
	
	
}
