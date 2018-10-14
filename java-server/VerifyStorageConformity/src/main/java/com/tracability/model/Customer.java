package com.tracability.model;

import java.io.IOException;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.tracability.main.Communication;

public class Customer {
	private String userID;
    private String lastName;
    private String firstName;
    private String organisation;
    private String login;
    private String password;
    private String phone;
    private String email;
    private String roles;
    private String creationDate;
    
    
	public Customer(String userID, String lastName, String firstName, String organisation, String login,
			String password, String phone, String email, String roles, String creationDate) {
		super();
		this.userID = userID;
		this.lastName = lastName;
		this.firstName = firstName;
		this.organisation = organisation;
		this.login = login;
		this.password = password;
		this.phone = phone;
		this.email = email;
		this.roles = roles;
		this.creationDate = creationDate;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getOrganisation() {
		return organisation;
	}

	public void setOrganisation(String organisation) {
		this.organisation = organisation;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}

	public String getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(String creationDate) {
		this.creationDate = creationDate;
	}

	public static Customer getCustomerFromID(String id) throws IOException, ParseException {
		String JSONProvider =  Communication.get("http://localhost:3000/api/Customer/" + id);
		JSONParser parser = new JSONParser();
		Object receptedValue = parser.parse(JSONProvider);
		
       // JSONArray arrayOfValuesJsonPackage = (JSONArray) receptedValue;
         JSONObject level1Pars = (JSONObject) receptedValue;
        
        //String providerID = (level1Pars.get("provider").toString().split("#"))[1];
        //Provider provider = Provider.getProviderFromId(providerID);
		/*Requetes get provider from id*/
		Customer c =new Customer(level1Pars.get("userId").toString(),level1Pars.get("lastname").toString(), level1Pars.get("firstname").toString(),
				level1Pars.get("organisation").toString(),level1Pars.get("login").toString(),
				level1Pars.get("password").toString(),level1Pars.get("phone").toString(), level1Pars.get("email").toString(),level1Pars.get("roles").toString(),level1Pars.get("creationDate").toString());
		return c;	

	}

	@Override
	public String toString() {
		return "Customer [userID=" + userID + ", lastName=" + lastName + ", firstName=" + firstName + ", organisation="
				+ organisation + ", login=" + login + ", password=" + password + ", phone=" + phone + ", email=" + email
				+ ", roles=" + roles + ", creationDate=" + creationDate + "]";
	}

}
