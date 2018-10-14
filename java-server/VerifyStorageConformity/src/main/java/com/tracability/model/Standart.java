package com.tracability.model;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.tracability.main.Communication;
import com.tracability.rule.Rule;

public class Standart {
	private String standartId;
	private String description;
	private List<String> contry;
	private List<Rule> rules;
	public Standart(String standartId, String description, List<String> contry, List<Rule> rules) {
		super();
		this.standartId = standartId;
		this.description = description;
		this.contry = contry;
		this.rules = rules;
	}
	public String getStandartId() {
		return standartId;
	}
	public void setStandartId(String standartId) {
		this.standartId = standartId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public List<String> getContry() {
		return contry;
	}
	public void setContry(List<String> contry) {
		this.contry = contry;
	}
	public List<Rule> getRules() {
		return rules;
	}
	public void setRules(List<Rule> rules) {
		this.rules = rules;
	}
	@Override
	public String toString() {
		return "Standart [standartId=" + standartId + ", description=" + description + ", contry=" + contry + ", rules="
				+ rules + "]";
	}
	public static Standart getStandartFromId(String id) throws IOException, ParseException {
		
		// TODO Auto-generated method stub
		String JSONStandart=  Communication.get("http://localhost:3000/api/Standart/" + id);
		JSONParser parser = new JSONParser();
		Object receptedValue = parser.parse(JSONStandart);
		JSONObject level1Pars = (JSONObject) receptedValue;
		JSONArray countryID = (JSONArray) level1Pars.get("country");
		List<String> country = new ArrayList<String>();
		String s;
		int i;
		for(i=0; i<countryID.size();i++) {
			 s = (countryID.get(i).toString().split("#"))[1];
			//System.out.println((profilID.get(i).toString().split("#"))[1]);
		     country.add(s);
		   }
		JSONArray ruleID = (JSONArray) level1Pars.get("rules");
		List<Rule> rules = new ArrayList<Rule>();
		Rule r;
		for(i=0; i< ruleID.size();i++) {
		      r = Rule.getRulesFromProfileId(( ruleID.get(i).toString().split("#"))[1]);
		      rules.add(r);
		   }
		return new Standart(level1Pars.get("standartId").toString(),level1Pars.get("description").toString(),country ,rules);
	}
	

}
