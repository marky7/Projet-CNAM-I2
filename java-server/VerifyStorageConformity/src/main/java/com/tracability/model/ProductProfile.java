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


public class ProductProfile {
	private String  productProfileid;
	private String label;
	private String description;
	private List<Standart> standarts;
	private String creationDate;
	
	public ProductProfile(String productProfileid, String label, String description, List<Standart> standarts,
			String creationDate) {
		super();
		this.productProfileid = productProfileid;
		this.label = label;
		this.description = description;
		this.standarts = standarts;
		this.creationDate = creationDate;
	}
	
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	
	public String getProductProfileid() {
		return productProfileid;
	}
	public void setProductProfileid(String productProfileid) {
		this.productProfileid = productProfileid;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public List<Standart> getStandarts() {
		return standarts;
	}
	public void setStandarts(List<Standart> standarts) {
		this.standarts = standarts;
	}
	public String getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(String creationDate) {
		this.creationDate = creationDate;
	}
	public static ProductProfile getProductProfilFromId(String id) throws IOException, ParseException {
		/*Requete get profilid */
		String JSONProfile=  Communication.get("http://localhost:3000/api/ProductProfile/" + id);
		JSONParser parser = new JSONParser();
		Object receptedValue = parser.parse(JSONProfile);
		JSONObject level1Pars = (JSONObject) receptedValue;
		JSONArray standartID = (JSONArray) level1Pars.get("standarts");
		List<Standart> standart = new ArrayList<Standart>();
		Standart s;
		int i;
		for(i=0; i<standartID.size();i++) {
			s = Standart.getStandartFromId((standartID.get(i).toString().split("#"))[1]);
			standart.add(s);
		   }
		return new ProductProfile(level1Pars.get("productProfileId").toString(),level1Pars.get("label").toString(),level1Pars.get("description").toString(),standart,level1Pars.get("creationDate").toString());
	}

	@Override
	public String toString() {
		return "ProductProfile [productProfileid=" + productProfileid + ", label=" + label + ", description="
				+ description + ", standarts=" + standarts + ", creationDate=" + creationDate + "]";
	}
	
}
