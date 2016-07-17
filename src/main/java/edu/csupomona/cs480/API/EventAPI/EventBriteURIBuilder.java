package edu.csupomona.cs480.API.EventAPI;

import java.net.URI;

import org.springframework.web.util.UriComponentsBuilder;

public class EventBriteURIBuilder extends UriComponentsBuilder {
	public static EventBriteURIBuilder newInstance(String token) {
		EventBriteURIBuilder uriBuilder = new EventBriteURIBuilder();
		uriBuilder.initURI();
		uriBuilder.setAuthToken(token);
		return uriBuilder;
	}
	private void initURI(){
		
		setProtocol();
		setHost();
		setVersion();
	}
	public void setProtocol(){
		this.scheme("https");
	}
	public void setHost(){
		this.host("www.eventbriteapi.com");
	}
	public void setVersion(){
		this.path("/v3");
	}
	public void setAuthToken(String tokenValue){
		this.queryParam("token", tokenValue);
	}
		
	public void searchForEventsURIPathSet(){
		this.path("/events/search/");
	}
	public void addURIParameter(String parameter, String value){
		this.queryParam(parameter, value);
	}
	public URI getURI(){
		return this.build().toUri();

	}

	
}
