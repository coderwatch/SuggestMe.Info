package edu.csupomona.cs480;

import java.util.ArrayList;

import org.junit.Assert;
import org.junit.Test;

import edu.csupomona.cs480.APIs.EventAPI.EventBriteAPI;
import edu.csupomona.cs480.Events.Event;

public class EventBriteAPITest{

	//note constructor parameter has not been established yet. for Now null works.
	EventBriteAPI eventBriteAPI = new EventBriteAPI(null);
	
	@Test
	 public void tesEventocations() { 		
		Assert.assertEquals(eventBriteAPI.testFlag,true);
	}
}