
var url = "https://api.nytimes.com/svc/books/v3/lists.json";
var book;
var image;
var books = [];
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
		request();
		$scope.getBook = function(){
			request();
			$scope.title = book.title;
			$scope.author = book.author;
			$scope.genre = book.genre;
			$scope.isbn = book.isbn;
			$scope.desc = book.desc;
			$scope.url = book.url;
			console.log(book.url);
			// requestServer(book.url);
			// $scope.image = image;
			$.ajax({

				url: "/json/" + book.url,
				type:'GET',
				success: function(response) {
					console.log(response);
					$scope.image = response;
				}
				fail: function(response){
					console.log("fail");
				}               
			});
			

			console.log("in bookController");
		}

	});

	// function requestServer(amazonUrl) {
	// 	$.ajax({

	// 		url: "/json/" + amazonUrl,
	// 		type:'GET',
	// 		success: function(response) {
	// 			console.log(response);
	// 			image = response;
	// 		}               
	// 	});
	// }

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
		book = books[Math.floor(Math.random()*books.length)];


		console.log("grabbed book" + book);
	}

	function parseJson(json){
		var url;
		var title;
		var author;
		var genre;
		var desc;

		var myJson = jQuery.parseJSON(JSON.stringify(json));

		myJson.results.forEach(function(item){
			url = item.amazon_product_url;
			console.log(url)
			genre = item.list_name;
			item.book_details.forEach(function(item){
				author = item.author;
				console.log(author);
				title = item.title;
				desc = item.description;
			});
			console.log(genre);
			books.push(new Book(author,desc,title, genre, url));
		});
	}
	function Book(author, desc, title, genre, url){
		this.author = author;
		this.desc = desc;
		this.title = title;
		this.genre = genre;
		this.url = url;
	}