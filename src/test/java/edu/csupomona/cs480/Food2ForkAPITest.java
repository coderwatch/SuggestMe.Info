package edu.csupomona.cs480;

import java.io.IOException;

import org.json.JSONObject;

import edu.csupomona.cs480.API.Food2Fork.*;

public class Food2ForkAPITest {
	
	public static Food2Fork test = new Food2Fork();
	
	public static void main (String[] args) throws IOException{
        try {
            final JSONObject searchResults = Food2Fork.search("chicken");
            final JSONObject recipe = test.getRecipe(test.getRecipeIds(searchResults).get(0));
            System.out.println(recipe.toString(2));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
