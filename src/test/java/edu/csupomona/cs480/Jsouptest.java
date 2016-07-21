package edu.csupomona.cs480;


import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
//import org.jsoup.select.Elements;

public class Jsouptest {
	
	public static void main(String[] args) throws IOException{
		String URL = "https://www.amazon.com/Pride-Prejudice-Jane-Austen/dp/1503290565/ref=sr_1_2?ie=UTF8&qid=1469082902&sr=8-2&keywords=pride+and+prejudice";
		Document doc = Jsoup.connect(URL).get();
		//Elements elements =doc.select("span[class=price final-price our fksk-our]");
	    System.out.println(doc.select("span[class=a-size-large]").text());
	}

}
