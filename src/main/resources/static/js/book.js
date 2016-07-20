
var url = "https://api.nytimes.com/svc/books/v3/lists.json";
var arrayOfListOfBooks = ["Combined Print and E-Book Fiction",
"Combined Print and E-Book Nonfiction",
"Hardcover Fiction",
"Hardcover Nonfiction",
"Trade Fiction Paperback",
"Mass Market Paperback",
"Paperback Nonfiction",
"E-Book Fiction",
"E-Book Nonfiction",
"Hardcover Advice",
"Paperback Advice",
"Advice How-To and Miscellaneous",
"Chapter Books",
"Childrens Middle Grade",
"Childrens Middle Grade E-Book",
"Childrens Middle Grade Hardcover",
"Childrens Middle Grade Paperback",
"Paperback Books",
"Picture Books",
"Series Books",
"Young Adult",
"Young Adult E-Book",
"Young Adult Hardcover",
"Young Adult Paperback",
"Hardcover Graphic Books",
"Paperback Graphic Books",
"Manga",
"Combined Print Fiction",
"Combined Print Nonfiction",
"Animals",
"Business Books",
"Celebrities",
"Crime and Punishment",
"Culture",
"Education",
"Espionage",
"Expeditions Disasters and Adventures",
"Fashion Manners and Customs",
"Food and Fitness",
"Games and Activities",
"Hardcover Business Books",
"Health",
"Humor",
"Indigenous Americans",
"Relationships",
"Paperback Business Books",
"Family",
"Hardcover Political Books",
"Race and Civil Rights",
"Religion Spirituality and Faith",
"Science",
"Sports",
"Travel"];
url += '?' + $.param({
  'api-key': "705fa0e1994d4a72a79cee53c93a05a6" ,
  'list': arrayOfListOfBooks[Math.floor(Math.random()*arrayOfListOfBooks.length)]
});
$("#book").ready(function() {
    $.ajax({
        url: url,
        type:'GET',
        success: function(jsonResp) {
            displayJson(jsonResp);
        }               
    });
});

function displayJson(json){
	var myJson = jQuery.parseJSON(JSON.stringify(json));
	console.log(myJson);
}