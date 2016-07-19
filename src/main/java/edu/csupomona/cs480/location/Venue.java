package edu.csupomona.cs480.location;

public class Venue {
	public double lattitude;
	public double longitude;
	public int  venueID;
	
	public Venue(int venueID){
		this.venueID = venueID;
	}
	public String venueIDAsString(){
		return this.venueID+"";
	}
}
