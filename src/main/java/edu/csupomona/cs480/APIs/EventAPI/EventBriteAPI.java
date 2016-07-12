package edu.csupomona.cs480.APIs.EventAPI;

import java.util.ArrayList;

import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import edu.csupomona.cs480.Events.Event;
import edu.csupomona.cs480.location.Location;

public class EventBriteAPI implements EventAPI {

	//used as anonymous auth token for interacting with the EvenBrite API.
	private String oAthToken = "XJ2NFMMBXQO52CYPAYOP";
	//private String applicationKey = "HUOIULLDRP7H3JQ6H5";
	private Location location;
	private RestTemplate restTemplate = new RestTemplate();
	public boolean testFlag = true;
	public UriComponentsBuilder builder = UriComponentsBuilder.newInstance();
	public EventBriteAPI(Location location){
		setLocation(location);
		builder.scheme("http");
		builder.host("www.eventbriteapi.com");
		builder.path("/v3");
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	private void setAuthToken(){
		builder.queryParam("token",oAthToken);
	}
	public ArrayList<Event> getEvents (Location location){
		//atuhenticate
		builder.path("/events/search/");
		setAuthToken();
		builder.queryParam("location.latitude", "34.0565");
		builder.queryParam("location.longitude", "117.8215");
		builder.build();
		return null;
	}
}
