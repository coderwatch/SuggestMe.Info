package edu.csupomona.cs480;




import java.io.IOException;
import edu.csupomona.cs480.API.LocationAPI.YelpAPI;
//import org.junit.*;


public class YelpAPItest {

	private static YelpAPI yelp = new YelpAPI();
	
	//test yelp
	public static void main(String[] args) throws IOException{
	yelp.setLL("37.788022,-122.399797");
	System.out.println(yelp.lnljson());
	}
	/*
	@Test
	public void testlocation1() throws IOException{
		yelp.setLocation("Los Angeles, CA");
		System.out.println(yelp.jsonresponse());
	}
	
	@Test
	public void testlocation2()throws IOException{
		yelp.setLocation("San Diego, CA");
		System.out.println(yelp.jsonresponse());
	}

*/
}

