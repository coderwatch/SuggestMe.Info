package edu.csupomona.cs480;


import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Node;
//import org.jsoup.select.Elements;

public class Jsouptest {
	
	public static void main(String[] args) throws IOException{
//		String URL = "https://www.amazon.com/Pride-Prejudice-Jane-Austen/dp/1503290565/ref=sr_1_2?ie=UTF8&qid=1469082902&sr=8-2&keywords=pride+and+prejudice";
//		Document doc = Jsoup.connect(URL).get();
//		//Elements elements =doc.select("span[class=price final-price our fksk-our]");
//	    System.out.println(doc.select("span[class=a-size-large]").text());
		
		String URL = "https://www.amazon.com/Before-Fall-Noah-Hawley-ebook/dp/B0151YQUTE?ie=UTF8&tag=thenewyorktim-20";
		Document doc = Jsoup.connect(URL).timeout(30000).userAgent("Mozilla/17.0").get();
		String got = ((Node) doc.select("img#ebooksImgBlkFront, img#imgBlkFront").first()).absUrl("data-a-dynamic-image");
		int numQuotes = 0;
		boolean done = false;
		int index = 0;
		int startImgUrl=0, endImgUrl=0;
		while(!done && index < got.length()) {
			if(got.charAt(index) == '"') {
				if(numQuotes==0) {
					startImgUrl = index+1;
				}
				else if(numQuotes==1) {
					endImgUrl = index;
				}
				numQuotes++;
			}
			if(numQuotes == 2) {
				done = true;
			}
			index++;
		}
		System.out.println("got: " + got);
		System.out.println("wanted: " + got.substring(startImgUrl, endImgUrl));
	}
	
	

}
