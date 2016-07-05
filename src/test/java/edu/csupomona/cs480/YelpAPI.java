package edu.csupomona.cs480;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;


// test of yelp api

public class YelpAPI {
	
	
	public static void main(String[] args){

		
		try{
			HttpClient httpClient = HttpClientBuilder.create().build();
			
			HttpGet getRequest = new HttpGet("https://api.yelp.com/v2/search?term=food&location=San+Francisco");
		
		}catch(Exception e){
			e.printStackTrace();
		}
		
	}
}
