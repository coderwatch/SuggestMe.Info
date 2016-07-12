package edu.csupomona.cs480.API.LocationAPI;


////////////LIBRARIES//////////////////////
import java.io.IOException;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.oauth.OAuth10aService;
import com.github.scribejava.core.model.*;
//////////////////////////////////////////

public class YelpAPI{
	

	private final static String Consumer_Key = "xr2AGjpXyVFSqOFZjukQjg";
	private final static String Consumer_Secret = "LWKk-n_sXFJtpSxFvyNOK4yIChA";
	private final static String PROTECTED_RESOURCE_URL = "https://api.yelp.com/v2/search";
	//private String location = "";
	private final static String Token = "eT__OvmM5po3P9-HdGkux50Y7cL7Nhi_";
	private final static String Token_Secret = "rZYKnrojkpmQlOb2xg5izVpLVE4";
	
	final OAuth10aService service;
	OAuth1AccessToken accessToken;
	
	public YelpAPI(){
		this.service = new ServiceBuilder().apiKey(Consumer_Key).apiSecret(Consumer_Secret).build(YelpAPIOAuth.instance());
	}
	
	public void testrun() throws IOException{
		this.accessToken = new OAuth1AccessToken(Token, Token_Secret);
		OAuthRequest request = new OAuthRequest(Verb.GET, "https://api.yelp.com/v2/search", service);
		request.addQuerystringParameter("term", "food");
		request.addQuerystringParameter("location", "Pomona, CA");
		request.addQuerystringParameter("limit", String.valueOf(3));
		this.service.signRequest(this.accessToken, request);
		Response response = request.send();
		System.out.println(response.getBody());
	}
	/*
	public void setLocation(String location){
		this.location = location;
	}
	*/

	public String jsonstring() {

		String returnString = "";
		try {
			final OAuth1RequestToken requestToken = service.getRequestToken();
			final String oauthVerifier = service.getAuthorizationUrl(requestToken);
			final OAuth1AccessToken accessToken = service.getAccessToken(requestToken, oauthVerifier);
			final OAuthRequest request = new OAuthRequest(Verb.GET, PROTECTED_RESOURCE_URL, service);
			request.addQuerystringParameter("term", "food");
			request.addQuerystringParameter("location", "Pomona,CA");
			service.signRequest(accessToken, request);
			final Response response = request.send();
			returnString = response.getBody();
			
		} catch (IOException e) {
			returnString = "didn't work";
		}
		return returnString;
	}

}
