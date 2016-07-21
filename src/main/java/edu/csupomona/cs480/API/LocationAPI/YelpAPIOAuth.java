package edu.csupomona.cs480.API.LocationAPI;

import com.github.scribejava.core.builder.api.DefaultApi10a;
import com.github.scribejava.core.model.OAuth1RequestToken;

/*
 * YELP API CLASS
 * 	The yelp api creates a branch from a default api format to use a reference
 * 
 * 
 */

public class YelpAPIOAuth extends DefaultApi10a {
	
	private static class InstanceHolder{
		private static final YelpAPIOAuth INSTANCE = new YelpAPIOAuth();
	}
	
	public static YelpAPIOAuth instance(){
		return InstanceHolder.INSTANCE;
	}

	@Override
	public String getRequestTokenEndpoint() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getAccessTokenEndpoint() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getAuthorizationUrl(OAuth1RequestToken requestToken) {
		// TODO Auto-generated method stub
		return null;
	}

}
