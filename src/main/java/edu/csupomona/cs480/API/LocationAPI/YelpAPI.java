package edu.csupomona.cs480.API.LocationAPI;


////////////LIBRARIES//////////////////////
import java.io.IOException;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.oauth.OAuth10aService;
import com.github.scribejava.core.model.*;
//////////////////////////////////////////

public class YelpAPI{
	
	//<!------DEFAULTS------>
	private final static String Consumer_Key = "xr2AGjpXyVFSqOFZjukQjg";
	private final static String Consumer_Secret = "LWKk-n_sXFJtpSxFvyNOK4yIChA";
	private final static String PROTECTED_RESOURCE_URL = "https://api.yelp.com/v2/search";
	private final static String Token = "eT__OvmM5po3P9-HdGkux50Y7cL7Nhi_";
	private final static String Token_Secret = "rZYKnrojkpmQlOb2xg5izVpLVE4";
	private String location = "";
	private String LL = "";
	//<--------------------->
	final OAuth10aService service;
	OAuth1AccessToken accessToken;
	
	public YelpAPI(){
		this.service = new ServiceBuilder().apiKey(Consumer_Key).apiSecret(Consumer_Secret).build(YelpAPIOAuth.instance());
	}
	
	public void setLocation(String location){
		this.location = location;
	}
	
	public void setLL(String LL){
		this.LL = LL;
	}

	public String jsonresponse() throws IOException {
		String jsonString = null;
		this.accessToken = new OAuth1AccessToken(Token, Token_Secret);
		OAuthRequest request = new OAuthRequest(Verb.GET, PROTECTED_RESOURCE_URL, service);
		request.addQuerystringParameter("term", "food");
		request.addQuerystringParameter("location", location);
		request.addQuerystringParameter("limit", String.valueOf(4));
		this.service.signRequest(this.accessToken, request);
		Response response = request.send();
		jsonString = response.getBody();
		return jsonString;
	}
	
	public String lnljson() throws IOException{
		String jsonString = null;
		this.accessToken = new OAuth1AccessToken(Token, Token_Secret);
		OAuthRequest request = new OAuthRequest(Verb.GET, PROTECTED_RESOURCE_URL, service);
		request.addQuerystringParameter("term", "food");
		request.addQuerystringParameter("ll", LL);
		request.addQuerystringParameter("limit", String.valueOf(4));
		this.service.signRequest(this.accessToken, request);
		Response response = request.send();
		jsonString = response.getBody();
		return jsonString;
		
	}
		/*
		public void testrun() throws IOException{
			this.accessToken = new OAuth1AccessToken(Token, Token_Secret);
			OAuthRequest request = new OAuthRequest(Verb.GET, "https://api.yelp.com/v2/search", service);
			request.addQuerystringParameter("term", "food");
			request.addQuerystringParameter("location", "Pomona, CA");
			request.addQuerystringParameter("limit", String.valueOf(4));
			this.service.signRequest(this.accessToken, request);
			Response response = request.send();
			System.out.println(response.getBody());
		}
		*/

}
