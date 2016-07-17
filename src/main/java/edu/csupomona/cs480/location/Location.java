package edu.csupomona.cs480.location;

//used to represent the longitude and latitude of an place
public class Location {
	public double longitude;
	public double latitude;
	
	/**
	 * 
	 * @param longitude 
	 * @param latitude
	 */
	public Location(double longitude, double latitude){
		this.longitude = longitude;
		this.latitude = latitude;
	}
	
	public String returnLatitudeAsString(){
			return this.latitude+"";
	}
	public String returnLongitudeAsString(){
		return this.longitude+"";
	}
	
}
