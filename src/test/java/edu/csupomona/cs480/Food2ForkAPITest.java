package edu.csupomona.cs480;

import java.io.IOException;

import org.json.JSONObject;

import edu.csupomona.cs480.API.Food2Fork.*;

public class Food2ForkAPITest {
	
	public static Food2Fork test = new Food2Fork();
	
	public static void main (String[] args) throws IOException{
        try {
            final JSONObject searchResults = test.search("vegan");
            final JSONObject recipelist[] = new JSONObject[10];
            for(int i = 0; i < 10; i++)
            {
            	 recipelist[i] = test.getRecipe(test.getRecipeIds(searchResults).get(i));
            	 System.out.println(recipelist[i].toString(2));
            	 System.out.println("");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
