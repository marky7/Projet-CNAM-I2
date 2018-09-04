package com.tracability.model;

import java.util.Date;
import java.util.List;

import com.tracability.rule.Rule;

public class ProductProfile {
	private long id;
	private String label;
	private List<Rule> rules;
	private Date creationDate;
	
	
	
	public ProductProfile(long id, String label, List<Rule> rules, Date creationDate) {
		super();
		this.id = id;
		this.label = label;
		this.rules = rules;
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
	
	public Date getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}
	@Override
	public String toString() {
		return "ProductProfile [id=" + id + ", label=" + label + ", rules=" + rules + ", creationDate=" + creationDate
				+ "]";
	}
	
	public List<Rule> getRules() {
		return rules;
	}
	public void setRules(List<Rule> rules) {
		this.rules = rules;
	}
	public static ProductProfile getProductProfilFromId(String id) {
		/*Requete get profilid */
		
		List<Rule> rules = Rule.getRulesFromProfileId(123);

		return new ProductProfile(2,"ViandeFroide",rules,new Date());
	}
	
}
