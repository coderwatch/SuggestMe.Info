package edu.csupomona.cs480.APIs.EventAPI;

import java.util.ArrayList;

import edu.csupomona.cs480.Events.Event;
import edu.csupomona.cs480.location.Location;

public interface EventAPI {
	ArrayList<Event> getEvents (Location location);
}
