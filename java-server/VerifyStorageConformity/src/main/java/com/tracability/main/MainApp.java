package com.tracability.main;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.drools.template.ObjectDataCompiler;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import org.kie.api.KieServices;
import org.kie.api.builder.KieFileSystem;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.StatelessKieSession;




import com.tracability.model.*;
import com.tracability.model.Package;
import com.tracability.rule.Rule;


import com.rabbitmq.client.*;
import java.io.IOException;



public class MainApp {

	private final static String QUEUE_NAME = "file3";
	
	public static void main(String[] args) throws Exception {
		/*Toutes les minutes on éxécute le code ci-dessous*/
		        // Création de la connexion
			 try {	ConnectionFactory factory = new ConnectionFactory();
			    factory.setHost("172.17.0.2");
			    factory.setPort(5672);
			    Connection connection = factory.newConnection();
			    Channel channel = connection.createChannel();
			    System.out.println(" [*] Waiting for messages. To exit press CTRL+C");
			    Consumer consumer = new DefaultConsumer(channel) {
			      @Override
			      public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body)
			          throws IOException {
			        String message = new String(body, "UTF-8");
			        
			        JSONParser parser = new JSONParser();
			        try{
			        	Object receptedValue = parser.parse(message);
			            JSONArray arrayOfValuesJsonAcquisition =  new JSONArray();
			            arrayOfValuesJsonAcquisition.add(receptedValue);
			            JSONObject level1Pars = (JSONObject) arrayOfValuesJsonAcquisition.get(0);
			            /*Object Creation : storage area*/
			            JSONObject parsedStorageArea = (JSONObject) level1Pars.get("storageArea");
			            Boolean  isMobile = Boolean.parseBoolean((String) parsedStorageArea.get("isMobile"));
			            StorageArea CurrentstorageArea = new StorageArea((String) parsedStorageArea.get("address"), isMobile, null );
			            /*Object Creation : measures*/
			            JSONArray parsedMeasures =  (JSONArray) level1Pars.get("measures");
			            String aqkDate="2018-10-12T18:17:39.993Z";
			            String measures_add = "[";
			            int i;
			            List<Measures> currentMeasures = new ArrayList<Measures>();
			            JSONObject tempMeasures;
			            double gasValue, temperaturesValue, humidityValue;
			            for(i=0; i<  parsedMeasures.size(); i++) {
			            	 tempMeasures = (JSONObject) parsedMeasures.get(i);
			            	 if(tempMeasures.get("name") != null){
			            		try {
			            			measures_add +="{";
			            			gasValue = Double.parseDouble( tempMeasures.get("value").toString());
			            			measures_add += "\"$class\": \"org.example.mynetwork.Gas\",";
			            			Date bis = new Date();
			            			measures_add += "\"measureId\": \""+"Measure" + bis.getHours() + bis.getMinutes() + bis.getSeconds()+"\",";
			            			measures_add += "\"type\": \"Gas\",";
			            			measures_add += "\"creationDate\": \""+ tempMeasures.get("creationDate").toString() +"\",";
			            			measures_add += "\"name\": \"" + tempMeasures.get("name").toString()+ "\",";
			            			measures_add += "\"description\": \"" +tempMeasures.get("description").toString() + "\",";
			            			measures_add += "\"value\": \"" +String.valueOf( gasValue) +  "\",";
			            			measures_add += "\"unit\": \""+ tempMeasures.get("unit").toString()+"\"";
			            			currentMeasures.add(new Gas(tempMeasures.get("creationDate").toString(),"Gas", null, gasValue,tempMeasures.get("name").toString(),tempMeasures.get("description").toString(),tempMeasures.get("unit").toString()));
			            			 if(i== parsedMeasures.size()-1)
					            	    	measures_add +="}";
					            	    else measures_add +="},";
			            		}catch(Exception e) {
			            			System.out.println("Erreur de conversion en double ");
			            		}
			            		
			            		// currentMeasures.add(new Gas(new Date(),"Gas", null, gasValue, (String) tempMeasures.get("name"),(String) tempMeasures.get("description"),(String) tempMeasures.get("unit")));
			            	 }else if(tempMeasures.get("temperatureUnit") != null) {
			            		 try {
			            			 measures_add +="{";
			            			 measures_add += "\"$class\": \"org.example.mynetwork.TemperatureHumidity\",";
				            			Date bis = new Date();
				            			measures_add += "\"measureId\": \""+"Measure" + bis.getHours() + bis.getMinutes() + bis.getSeconds()+"\",";
				            			measures_add += "\"type\": \"temperatureHumidity\",";
				            			measures_add += "\"creationDate\": \""+ tempMeasures.get("creationDate").toString() +"\",";
				            			humidityValue = Double.parseDouble(tempMeasures.get("humidity").toString());
					            	    temperaturesValue = Double.parseDouble(tempMeasures.get("temperature").toString());
					            	    measures_add += "\"\"temperature\": \"" +  String.valueOf(temperaturesValue )  +  "\",";
					            	    measures_add += "\"\"temperatureUnit\": \"" + tempMeasures.get("temperatureUnit").toString() +  "\",";
					            	    measures_add += "\"humidity\": \""+ String.valueOf(humidityValue) +"\",";
					            	    measures_add += "\"humidityUnit\": \""+ tempMeasures.get("humidityUnit").toString() +"\"";
				            	        currentMeasures.add(new TemperaturesHumidity(tempMeasures.get("creationDate").toString(),"temperature", null,temperaturesValue,tempMeasures.get("temperatureUnit").toString(),humidityValue,tempMeasures.get("humidityUnit").toString()));
				            	    if(i!= parsedMeasures.size()-1)
				            	    	 measures_add +="},";
				            	    else measures_add +="}";
			            		 }catch(Exception e) {
				            			System.out.println("parse to double error"  + e);
				            		}
			            	 }	
			            	 aqkDate = tempMeasures.get("creationDate").toString();
			            }
			          
			            
			            /*Object Creation : tags*/
			            String tag_add = "[";
			            List<Tag> currentTags = new ArrayList<Tag>();
			            JSONArray parsedTags =  (JSONArray) level1Pars.get("tags");
			            JSONObject tag;
			            for(i=0; i<   parsedTags.size(); i++) {
			            	 tag_add += "{\"creationDate\":\""+aqkDate+"\",";
			           	     tag = (JSONObject) parsedTags.get(i);
			           	     tag_add += "{\"value\":\""+ tag.get("value").toString()+"\",";
			           		 tag_add += "{\"tagId\":\""+tag.get("tagId").toString()+"\"";
			            	 currentTags.add(new Tag(tag.get("tagId").toString(), tag.get("value").toString(),new Date()));
			            	 if(i !=parsedTags.size()-1)
			            		 tag_add += "},";
			            	 else 
			            		 tag_add += "}";
			            	
			            }
			            
			            
			            /*Ajout en base..*/
			            List<String> aquisitionId = new ArrayList<String>();
			            List<String> aquisitionValues = new ArrayList<String>();
			            //Ajout Id Aquisition
			            aquisitionId.add("acquisitionId");
			            Date d = new Date();
			            aquisitionValues.add("Acquisition" + d.getHours() + d.getMinutes() + d.getSeconds());
			            aquisitionId.add("creationDate");
			            aquisitionValues.add(aqkDate);
			            aquisitionId.add("tags");
			            aquisitionValues.add(tag_add);
			            tag_add +="]";
			            aquisitionId.add("measures");
			            measures_add +="]";
			            aquisitionValues.add(measures_add);
			            Communication.post("http://localhost:3000/api/createAcquisition",  aquisitionId, aquisitionValues);
			            //Get package from rest api
			            List<Package> presentPackages = new ArrayList<Package>();
			            Tag tagInfo;
						i=0;
						while(i<currentTags.size()) {
							tagInfo = currentTags.get(i);
							Package pack=null;
							try {
								pack = getPackageFromTag(tagInfo);
								 presentPackages.add(pack);
							} catch (Exception e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
							presentPackages.add(pack);
							i++;
						}
						int nbpacks = presentPackages.size();
						int j=0;
						while(j<nbpacks) {
							Package pack =presentPackages.get(j);
						
							List<Product> products = pack.getProducts();
							
							int nbproducts = products.size();
							
							int k = 0;
							while(k<nbproducts) {	
								Product product = products.get(k);
								//Vérifier que les régles de transport sont réspectées
								List<ProductProfile> profil_product = product.getProductProfil();
							
		                       int l=0;
		                       while(l<profil_product.size()) {	
		                    	   ProductProfile pprofil= profil_product.get(l);
		                    	   System.out.println("Profil associée :" + pprofil.getLabel());
		                    	   List<Standart> productStandart =pprofil.getStandarts();
			                       int m=0;
			                       while(m < productStandart.size()) {	
			                    	   Standart pstandart = productStandart.get(m);
			                    	   System.out.println("Standart :" + pstandart.toString());
			                    	   List<Rule> pRules= pstandart.getRules();;
				                       int n=0;
				                       while(n < pRules.size()) {	
				                    	   Rule pRule =  pRules.get(n);
				                    	   System.out.println("Rule :" +  pRule.toString());
				                    	   int o;
				                    	   for(o=0; o<currentMeasures.size();o++) {
				                    		 if (pRule.getType().equals( currentMeasures.get(o).getType())) {
				                    		   String drl = null;
												try {
													drl = applyRuleTemplate(currentMeasures.get(o),pRule);
												} catch (Exception e) {
													// TODO Auto-generated catch block
													e.printStackTrace();
												}
												AlertDecision alertDecision = null;
												try {
													alertDecision = evaluate(drl, currentMeasures.get(o));
												} catch (Exception e) {
													// TODO Auto-generated catch block
													e.printStackTrace();
												}
												TemperaturesHumidity tes = (TemperaturesHumidity) currentMeasures.get(o);
												 if (alertDecision.getDoAlert()) {
													   List<String> keys = new ArrayList<String>();
													   List<String> valuesKeys = new ArrayList<String>();
													   keys.add("alertId");
													   String valId = "alert" + pRule.toString() + new Date();
													   valId.replaceAll("\\s+","");
													   valuesKeys.add(valId);
													   keys.add("description");
													   valuesKeys.add("Alert on : " + pprofil.getLabel() + ". No respect of rule : " + pRule.toString());
													   keys.add("type");
													   valuesKeys.add(pprofil.getLabel()+"Error");
													   keys.add("status");
													   valuesKeys.add("NoRescpectStandartPackage");
											        	//notification
													 	Communication.post("http://localhost:3000/api/Alert", keys, valuesKeys);
											        	System.out.println("Detection d'anomalies!!");
											        }
												
				                    		 	}
				                    		 }
				                    	  
				                    	   n++;
				                       }
			                    	   m++;
			                       }
		                    	   l++;
		                       }
								k++;
							}
							j++;
						}
			            
			         }catch(ParseException pe){
			            System.out.println("position: " + pe.getPosition());
			            System.out.println(pe);
			         }
				    
			      }
			    };
			    channel.basicConsume(QUEUE_NAME, true, consumer);
			    }catch (Exception e) {
			    	  System.out.println(" Serveur de message non connecté");
			    }
			    
	}

	private static Package getPackageFromTag(Tag tag) throws Exception {
		   String JSONPackage =  Communication.get("http://localhost:3000/api/queries/selectPackage?tagid=resource%3Aorg.example.mynetwork.Tag%23" + tag.getValue());
		  
		   JSONParser parser = new JSONParser();
		   Object receptedValue = parser.parse(JSONPackage);
           JSONArray arrayOfValuesJsonPackage = (JSONArray) receptedValue;
           JSONObject level1Pars = (JSONObject)  arrayOfValuesJsonPackage.get(0);
           String providerID = (level1Pars.get("provider").toString().split("#"))[1];
           Provider provider = Provider.getProviderFromId(providerID);
           String customerID = (level1Pars.get("customer").toString().split("#"))[1];
           Customer customer = Customer.getCustomerFromID(customerID);
       	   String deleveryDate = level1Pars.get("deliveryDate").toString();
       	   String creationDate = level1Pars.get("creationDate").toString();
       	 
       	   JSONArray productID = (JSONArray) level1Pars.get("products");
       	
   		   List<Product> products = new ArrayList<Product>();
   		   int i;
   		   Product p;
   		   for(i=0; i<productID.size();i++) {
   			
   			p = Product.getProductFromID((productID.get(i).toString().split("#"))[1]);
   			
   		    products.add(p);
   		   }
   		   List<Attachment> attachments = new ArrayList<Attachment>();
   		   Package pack = new Package(0, "Test Package",provider, customer, products,deleveryDate,  attachments , tag, creationDate);
   		   return pack;
	}
	
	
	static private AlertDecision evaluate(String drl, Measures measures) throws Exception {
        KieServices kieServices = KieServices.Factory.get();
        KieFileSystem kieFileSystem = kieServices.newKieFileSystem();
        kieFileSystem.write("src/main/resources/rule.drl", drl);
        kieServices.newKieBuilder(kieFileSystem).buildAll();

        KieContainer kieContainer = kieServices.newKieContainer(kieServices.getRepository().getDefaultReleaseId());
        StatelessKieSession statelessKieSession = kieContainer.getKieBase().newStatelessKieSession();

        AlertDecision alertDecision = new AlertDecision();
        statelessKieSession.getGlobals().set("alertDecision", alertDecision);
        statelessKieSession.execute(measures);
        return alertDecision;
    }
	

	/*Génération des règles*/
	static private String applyRuleTemplate(Measures measures, Rule rule) throws Exception {
        Map<String, Object> data = new HashMap<String, Object>();
        ObjectDataCompiler objectDataCompiler = new ObjectDataCompiler();

        data.put("rule", rule);
        data.put("measure", measures.getClass().getName());
        return objectDataCompiler.compile(Arrays.asList(data), Thread.currentThread().getContextClassLoader().getResourceAsStream("rule-template.drl"));
    }
	
}
