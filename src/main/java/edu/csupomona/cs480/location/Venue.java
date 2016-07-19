package edu.csupomona.cs480.location;

public class Venue {
	public double lattitude;
	public double longitude;
	public double venueID;
	
	public Venue(double venueID){
		this.venueID = venueID;
	}
	public String venueIDAsString(){
		return this.venueID+"";
	}
}
