package edu.csupomona.cs480.Events;

/**
 * 
 * @author Oscar
 *
 */

public class Event{
	private String name;
	private String city;
	private String state;
	private String description;
	
	public Event(String name, String city, String state, String description){
		setState(state);
		setCity(city);
		setName(state);
		setDescription(description);
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}