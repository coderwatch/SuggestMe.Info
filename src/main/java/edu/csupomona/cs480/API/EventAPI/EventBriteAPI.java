package edu.csupomona.cs480.API.EventAPI;

import java.net.URI;

import org.springframework.web.client.RestTemplate;
import edu.csupomona.cs480.location.Location;
import edu.csupomona.cs480.location.Venue;

public class EventBriteAPI implements EventAPI {

	//used as anonymous auth token for interacting with the EvenBrite API.
	private final String OATH_TOKEN = "XJ2NFMMBXQO52CYPAYOP";
	private final String PERSONAL_OATH_TOKEN = "ZUOFR6E2S3YZFW4QOJVB";
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
		builder.addURIParameter("location.latitude", location.returnLatitudeAsString());
		builder.addURIParameter("location.longitude", location.returnLongitudeAsString());
		builder.setStartDate();
		builder.setEndDate();
		builder.finish();
		URI url = builder.getURI();
		System.out.println(url);
		String jsonResponse = restTemplate.getForObject(url,String.class);
		System.out.println(jsonResponse);
		return jsonResponse;
	}
	public String getVenueCoordinates(Venue venue){
		configureForVenue();
		builder.path(venue.venueIDAsString());
		URI url = builder.getURI();
		System.out.println(url);
		String jsonResponse = restTemplate.getForObject(url,String.class);
		return jsonResponse;
		
	}
	private void configureForVenue(){
		builder = EventBriteURIBuilder.newInstance(PERSONAL_OATH_TOKEN);
		builder.searchForVenuePathSet();
	}
}
