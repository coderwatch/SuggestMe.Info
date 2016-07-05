package edu.csupomona.cs480.APIs.EventAPI;

import java.util.ArrayList;

import org.springframework.web.client.RestTemplate;

import edu.csupomona.cs480.Events.Event;
import edu.csupomona.cs480.location.Location;

public class EventBriteAPI implements EventAPI {

	//used as anonymous auth token for interacting with the EvenBrite API.
	private String oAthToken = "XJ2NFMMBXQO52CYPAYOP";
	//private String applicationKey = "HUOIULLDRP7H3JQ6H5";
	private Location location;
	private RestTemplate restTemplate = new RestTemplate();
	public EventBriteAPI(Location location){
		setLocation(location);
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	
	public ArrayList<Event> getEvents (Location location){
		
		//test query to return a list of events with cal poly as a key word.
	    final String uri = "https://www.eventbriteapi.com/v3/events/search/?token="+oAthToken+"&q=cal Poly";
	     
	    String result = restTemplate.getForObject(uri, String.class);
	     
	    System.out.println(result);
		
		return null;
	}
}
