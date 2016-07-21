
var url = "https://api.nytimes.com/svc/books/v3/lists.json";
var book;
var results = [];
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

// var bookApp = angular.module("myBookApp",[]);

myApp.controller("BookCtrl", function($scope){
	$scope.getBook = function(){
		request();
		$scope.title = book.title;
		$scope.author = book.author;
		$scope.genre = book.genre;
		$scope.isbn = book.isbn;
		$scope.desc = book.desc;
		$scope.url = book.url;

		console.log("in bookController");
	}

});

function request() {
	$.ajax({
		url: url+= '?' + $.param({
			'api-key': "705fa0e1994d4a72a79cee53c93a05a6" ,
			'list': arrayOfListOfBooks[Math.floor(Math.random()*arrayOfListOfBooks.length)]}),
		type:'GET',
		success: function(jsonResp) {
			console.log("sending get request!");
			parseJson(jsonResp);
			getRandomBook();
		}               
	});
}

function getRandomBook(){
	var result = results[Math.floor(Math.random()*results.length)];
	var resultBookDetails = result.book_details;
	book = new Book(resultBookDetails.isbn,resultBookDetails.author,resultBookDetails.desc, resultBookDetails.title,resultBookDetails.genre,
		result.amazon_product_url);
	console.log("made a new Book " + book);
}

function parseJson(json){
	var myJson = jQuery.parseJSON(JSON.stringify(json));
	
	myJson.results.forEach(function(item){
			results.push(item);
	});	
}

function Book(isbn, author, desc, title, genre, url){
	this.isbn = isbn;
	this.author = author;
	this.desc = desc;
	this.title = title;
	this.genre = genre;
	this.url = url;
}