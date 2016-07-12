package edu.csupomona.cs480.API.LocationAPI;


////////////LIBRARIES//////////////////////
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.oauth.OAuth10aService;
import com.github.scribejava.core.model.*;
import edu.csupomona.cs480.location.Location;
//////////////////////////////////////////

public class YelpAPI implements LocationAPI {
	

	private final static String Consumer_Key = "xr2AGjpXyVFSqOFZjukQjg";
	private final static String Consumer_Secret = "LWKk-n_sXFJtpSxFvyNOK4yIChA";
	private final static String PROTECTED_RESOURCE_URL = "https://api.yelp.com/v2/search";
	private String location = "";
	//private final static String Token = "eT__OvmM5po3P9-HdGkux50Y7cL7Nhi_";
	//private final static String Token_Secret = "rZYKnrojkpmQlOb2xg5izVpLVE4";
	
	
	
	final OAuth10aService service = new ServiceBuilder().apiKey(Consumer_Key).apiSecret(Consumer_Secret).build(null);
	
	public YelpAPI(String location){
		this.location = location;
	}
	
	public String getLocations(){
		
		String returnString = "";
		try {
			final OAuth1RequestToken requestToken = service.getRequestToken();
			final String oauthVerifier = service.getAuthorizationUrl(requestToken);
			final OAuth1AccessToken accessToken = service.getAccessToken(requestToken, oauthVerifier);
			final OAuthRequest request = new OAuthRequest(Verb.GET, PROTECTED_RESOURCE_URL, service);
			request.addQuerystringParameter("term", "food");
			request.addQuerystringParameter("location", location);
			service.signRequest(accessToken, request);
			final Response response = request.send();
			returnString = response.getBody();
			
		} catch (IOException e) {
			StringWriter sw = new StringWriter();
			e.printStackTrace(new PrintWriter(sw));
			returnString = sw.toString();
		}
		return returnString;
	}


	
	@Override
	public ArrayList<Location> getLocations(Location location) {
		// TODO Auto-generated method stub
		return null;
	}

}
