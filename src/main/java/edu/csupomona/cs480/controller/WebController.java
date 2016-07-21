package edu.csupomona.cs480.controller;



//////////////////////////////////////////////////////////////////
//////////////////////LIBRARIES///////////////////////////////////
//////////////////////////////////////////////////////////////////
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import edu.csupomona.cs480.App;
import edu.csupomona.cs480.API.LocationAPI.*;
import edu.csupomona.cs480.API.EventAPI.EventAPI;
import edu.csupomona.cs480.API.EventAPI.EventBriteAPI;
import edu.csupomona.cs480.API.Food2Fork.Food2Fork;
import edu.csupomona.cs480.Events.Event;
import edu.csupomona.cs480.data.User;
import edu.csupomona.cs480.data.provider.UserManager;
import edu.csupomona.cs480.location.Location;
import edu.csupomona.cs480.location.Venue;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.select.Elements;
import java.io.IOException;
import java.util.*;
import com.google.common.base.Joiner;
import org.apache.commons.io.FileUtils;
import org.apache.commons.math.fraction.Fraction;
import org.json.JSONObject;

import java.io.*;
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

/**
 * This is the controller used by Spring framework.
 * <p>
 * The basic function of this controller is to map
 * each HTTP API Path to the correspondent method.
 *
 */

@RestController
public class WebController {
	
	public static Food2Fork fork = new Food2Fork();
	public static ArrayList<JSONObject> recipelist = new ArrayList<JSONObject>();
	public static Random rand = new Random();
	
	//<!------Eventbrite------->
	@RequestMapping(value = "/events/{latitude}/{longitude}", method = RequestMethod.GET)
	String getEvents(@PathVariable("latitude") double latitude, @PathVariable("longitude") double longitude) {
		EventAPI api = new EventBriteAPI();
		Location geoLocation = new Location(latitude, longitude);
		String eventsJson = api.getEventsJsonByGeoLocation(geoLocation);
		return eventsJson;	
	}
	
	@RequestMapping(value = "/jsoup", method = RequestMethod.POST)
	 	String testJSON(@RequestParam("URL") String URL) throws IOException {
		Document doc = Jsoup.connect(URL).timeout(30000).userAgent("Mozilla/17.0").get();
//		Elements elements =doc.select("div.maintain-height img");
		String got = ((Node) doc.select("img#ebooksImgBlkFront, img#imgBlkFront").first()).absUrl("data-a-dynamic-image");
		int numQuotes = 0;
		boolean done = false;
		int index = 0;
		int startImgUrl=0, endImgUrl=0;
		while(!done && index < got.length()) {
			if(got.charAt(index) == '"') {
				if(numQuotes==0) {
					startImgUrl = index+1;
				}
				else if(numQuotes==1) {
					endImgUrl = index;
				}
				numQuotes++;
			}
			if(numQuotes == 2) {
				done = true;
			}
			index++;
		}
		String wanted = got.substring(startImgUrl, endImgUrl);
		System.out.println("img url: " + wanted);
		return wanted;
	 }
	
	//<!-------Using Venue from EventBrite API--------->
	@RequestMapping(value = "/getVenue/{id}", method = RequestMethod.GET)
	String getVenue(@PathVariable("id") int id){
		EventAPI api = new EventBriteAPI();
		Venue venue = new Venue(id);
		String venueJson = api.getVenueCoordinates(venue);
		return venueJson;
	}
	
	//<!------Yelp Search based off a String------->
	@RequestMapping(value = "/food/{location}", method = RequestMethod.GET)
	String getLocation(@PathVariable("location") String location) throws IOException{
		YelpAPI yelp = new YelpAPI();
		yelp.createToken();
		yelp.setLocation(location);
		return yelp.stringSearch();
	}
	
	//<!-----Yelp Search with Longitude and Latitude----->
	@RequestMapping(value = "/food/{Latitude}/{Longitude}", method = RequestMethod.GET)
	String getLocationLL(@PathVariable("Latitude") String latitude, 
						@PathVariable("Longitude") String longitude) throws IOException{
		YelpAPI yelp = new YelpAPI();
		yelp.createToken();
		yelp.setLatitudeLongitude(latitude, longitude);
		return yelp.latitudelongitudeSearch();
	}
	
	//<!------Food2Fork Recipe List Search------>
	@RequestMapping(value = "/recipe/{search_term}", method = RequestMethod.GET)
	String getRecipeList(@PathVariable("search_term") String search_term)throws IOException{
		recipelist.clear();
		final JSONObject searchResults = fork.search(search_term);
		for(int i = 0; i < 10; i++){
			recipelist.add(fork.getRecipe(fork.getRecipeIds(searchResults).get(i)));
		}
		int index = (int) rand.nextInt(recipelist.size());
		String response = recipelist.get(index).toString(2);
		recipelist.remove(index);
		return response;
	}
	//<!-----Get Random Request from Food2Fork------->
	@RequestMapping(value = "/recipe/random", method = RequestMethod.GET)
	String getRandomRecipe()throws IOException{
		String response= null;
		if(recipelist.size() <= 0){
			response = "List is empty!";
		}
		else{
			int index = rand.nextInt(recipelist.size());
			response = recipelist.get(index).toString(2);
			recipelist.remove(index);
		}
		return response;
	}
}