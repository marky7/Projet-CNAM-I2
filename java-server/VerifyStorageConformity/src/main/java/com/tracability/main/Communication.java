package com.tracability.main;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;

public class Communication {
	public static String get(String url) throws IOException{

		String source ="";
		URL api_rest = new URL(url);
		URLConnection yc = api_rest.openConnection();
		BufferedReader in = new BufferedReader(
		new InputStreamReader(
		yc.getInputStream()));
		String inputLine;
       
		while ((inputLine = in.readLine()) != null)
			source +=inputLine;
			in.close();
			return source;
		}
	public static String post(String adress,List<String> keys,List<String> values) throws IOException{
		String result = "";
		OutputStreamWriter writer = null;
		BufferedReader reader = null;
	
			//encodage des paramètres de la requête
	        String data=" {";
			for(int i=0;i< keys.size();i++){
				if (i!=0) data += ",";
				data += "\""+ keys.get(i) +"\": \""+ values.get(i)+ "\"";
			}
			data +="}";
			//création de la connection
			
			HttpClient httpClient = HttpClientBuilder.create().build();
			try {

			    HttpPost request = new HttpPost(adress);
			    StringEntity entity = new StringEntity(data,
		                ContentType.APPLICATION_FORM_URLENCODED);
			    request.addHeader("content-type", "application/json");
			    request.setEntity(entity);
			    System.out.println(data);
			    HttpResponse response = httpClient.execute(request);
			    System.out.println("Ajout en base OK");
			    //handle response here...
			    return response.toString();
			}catch (Exception ex) {

			    //handle exception here

			}
			return "1";
	
		
		}
}
