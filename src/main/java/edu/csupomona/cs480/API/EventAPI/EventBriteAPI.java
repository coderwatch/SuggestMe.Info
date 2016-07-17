package edu.csupomona.cs480.API.EventAPI;

import java.net.URI;

import org.springframework.web.client.RestTemplate;
import edu.csupomona.cs480.location.Location;

public class EventBriteAPI implements EventAPI {

	//used as anonymous auth token for interacting with the EvenBrite API.
	private final String OATH_TOKEN = "XJ2NFMMBXQO52CYPAYOP";
	private Location location;
	private RestTemplate restTemplate = new RestTemplate();
	public EventBriteURIBuilder builder = EventBriteURIBuilder.newInstance(OATH_TOKEN);
	
	public EventBriteAPI(){
		
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public String getEventsJsonByGeoLocation (Location location){
		builder.searchForEventsURIPathSet();
		builder.addURIParameter("location.longitude", location.returnLongitudeAsString());
		builder.addURIParameter("location.latitude", location.returnLatitudeAsString());
		URI url = builder.getURI();
		String jsonResponse = restTemplate.getForObject(url,String.class);
		System.out.println(jsonResponse);
		return jsonResponse;
	}
}
