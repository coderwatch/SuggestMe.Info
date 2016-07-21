package edu.csupomona.cs480;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Random;

import org.json.JSONObject;

import edu.csupomona.cs480.API.Food2Fork.*;

public class Food2ForkAPITest {
	
	public static Food2Fork fork = new Food2Fork();
	public static ArrayList<JSONObject> recipelist = new ArrayList<JSONObject>();
	public static Random rand = new Random();
	
	public static void main (String[] args) throws IOException{
        try {
        	
            final JSONObject searchResults = fork.search("vegan");
            for(int i = 0; i < 10; i++){
            	 recipelist.add(fork.getRecipe(fork.getRecipeIds(searchResults).get(i)));
            }
            int index = (int) rand.nextInt(recipelist.size());
        
            String response = recipelist.get(index).toString(2);
            recipelist.remove(index);
            System.out.println(response);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
