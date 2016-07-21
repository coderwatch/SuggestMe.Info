package edu.csupomona.cs480.API.Food2Fork;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

public class Food2Fork{
    private static final String API_URL_BASE = "http://food2fork.com/api/";
    private static final String API_KEY = "d06533ba000b26bd6d073e35984355ec";
    private static final OkHttpClient client = new OkHttpClient();

    /**
     * Performs an HTTP GET and parses the response body as JSON.
     */
    
    private static JSONObject run(String url) throws IOException {
        final Request request = new Request.Builder().url(url).build();
        final Response response = client.newCall(request).execute();
        return new JSONObject(response.body().string());
    }

    public JSONObject search(String query) throws IOException {
        final String url = API_URL_BASE + "/search?key=" + API_KEY + "&q=" + URLEncoder.encode(query, "UTF-8");
        return run(url);
    }

    /**
     * Extracts recipe IDs from search results.
     */
    
    public List<String> getRecipeIds(JSONObject result) throws IOException {
        final ArrayList<String> recipeIds = new ArrayList<String>();
        final JSONArray recipes = result.getJSONArray("recipes");
        for (int i = 0; i < recipes.length(); ++i) {
            final JSONObject recipe = recipes.getJSONObject(i);
            final String id = recipe.getString("recipe_id");
            recipeIds.add(id);
        }
        return recipeIds;
    }

    public JSONObject getRecipe(String id) throws IOException {
        final String url = API_URL_BASE + "get?key=" + API_KEY + "&rId=" + id;
        return run(url);
    }


}