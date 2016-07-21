package edu.csupomona.cs480;

import java.io.IOException;
import edu.csupomona.cs480.API.LocationAPI.YelpAPI;
//import org.junit.*;

public class YelpAPItest {

	private static YelpAPI yelp = new YelpAPI();
	
	//test yelp
	public static void main(String[] args) throws IOException{
	String lat = "34.0551";
	String longitude = "-117.7500";
	yelp.setLatitudeLongitude(lat, longitude);
	//34.0551, 117.7500
	System.out.println(yelp.latitudelongitudeSearch());
	}
}

