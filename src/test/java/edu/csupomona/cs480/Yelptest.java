package edu.csupomona.cs480;

import java.io.IOException;
import edu.csupomona.cs480.API.LocationAPI.YelpAPI;
import org.junit.*;

public class Yelptest {
	private static YelpAPI yelp = new YelpAPI();
	
	//test yelp
	public static void main(String[] args) throws IOException{
	yelp.setLocation("Pomona, CA");
	yelp.testrun();
	}
	
	@Test
	public void testlocation1() throws IOException{
		yelp.setLocation("Los Angeles, CA");
		yelp.testrun();
	}
	
	@Test
	public void testlocation2()throws IOException{
		yelp.setLocation("San Diego, CA");
		yelp.testrun();
	}

}
