package edu.csupomona.cs480.API.LocationAPI;


////////////LIBRARIES//////////////////////
import java.io.IOException;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.oauth.OAuth10aService;
import com.github.scribejava.core.model.*;
//////////////////////////////////////////

public class YelpAPI{
	
	//<!------TOOLS------>
	private final static String Consumer_Key = "xr2AGjpXyVFSqOFZjukQjg";
	private final static String Consumer_Secret = "LWKk-n_sXFJtpSxFvyNOK4yIChA";
	private final static String PROTECTED_RESOURCE_URL = "https://api.yelp.com/v2/search";
	private final static String Token = "eT__OvmM5po3P9-HdGkux50Y7cL7Nhi_";
	private final static String Token_Secret = "rZYKnrojkpmQlOb2xg5izVpLVE4";
	private String location = "";
	private String geocoordinates = "";
	final OAuth10aService service;
	OAuth1AccessToken accessToken;
	//<--------------------->
	
	public YelpAPI(){
		this.service = new ServiceBuilder().apiKey(Consumer_Key).apiSecret(Consumer_Secret).build(YelpAPIOAuth.instance());
	}
	//creates Token for this use
	public void createToken(){
		this.accessToken = new OAuth1AccessToken(Token, Token_Secret);
	}
	//Sets the location based off String
	public void setLocation(String location){
		this.location = location;
	}
	
	//Sets search location based off geo-coordinates
	public void setLatitudeLongitude(String latitude, String longitude){
		this.geocoordinates = latitude +","+longitude;
	}
	
	public String stringSearch() throws IOException {
		OAuthRequest request = new OAuthRequest(Verb.GET, PROTECTED_RESOURCE_URL, service);
		request.addQuerystringParameter("term", "food");
		request.addQuerystringParameter("location", location);
		request.addQuerystringParameter("limit", String.valueOf(10));
		return makeRequest(request);
	}
	
	public String latitudelongitudeSearch() throws IOException{
		OAuthRequest request = new OAuthRequest(Verb.GET, PROTECTED_RESOURCE_URL, service);
		request.addQuerystringParameter("term", "food");
		request.addQuerystringParameter("ll", geocoordinates);
		request.addQuerystringParameter("limit", String.valueOf(10));
		return makeRequest(request);
	}
	
	public String makeRequest(OAuthRequest request) throws IOException{
		this.service.signRequest(this.accessToken, request);
		Response response = request.send();
		return response.getBody();
	}

}
