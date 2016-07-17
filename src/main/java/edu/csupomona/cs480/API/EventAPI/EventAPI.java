   package edu.csupomona.cs480.API.EventAPI;

import java.util.ArrayList;

import edu.csupomona.cs480.Events.Event;
import edu.csupomona.cs480.location.Location;

public interface EventAPI {
	/**
	 * 
	 * @param location the location object we want events around. Contains a longitude and latitude double
	 * @return the json response from eventbrite as a string.
	 */
	String getEventsJsonByGeoLocation (Location location);
}
