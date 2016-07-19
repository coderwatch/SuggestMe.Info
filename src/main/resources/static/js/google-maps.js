// Google maps javascript api documentation
// https://developers.google.com/maps/documentation/javascript/reference

// global variables

// map markers and info windows
var markers = [],
 infoWindows = [], 
 // array of Business objects, obtained from yelp api, used for displaying store info in a table
 businesses = [], 
 // google map
 map, 
 // visitor's current location
 userLat, userLng, 
 // labels for map markers, each one letter
 labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
 // index of next available label, start from 0 
 labelIndex = 0,
 // array of venues
 venues = [];

// google.maps.event.addListenerOnce(map, 'idle', function() {
//    google.maps.event.trigger(map, 'resize');
// });
// callback function from google maps
function mapsCallback() {
  getLocation();
}

// uses HTML5 geolocation to get the user's locaton
//  The navigator object contains information about the browser.
function getLocation() {
    if (navigator.geolocation) {
      // if able to get location calls successGeolocation function, else calls errorGeolocation
        navigator.geolocation.getCurrentPosition(successGeolocation, errorGeolocation);
    } 
    else { 
        alert("Geolocation is not supported by this browser.");
    }

}

// if successfully got user location then initialize map on user location
function successGeolocation(position)
{
  // position.coords is the user location from HTML5 geolocation api
  userLat = position.coords.latitude;
  userLng = position.coords.longitude;
  initMap();
}

function errorGeolocation(error)
{
  alert('ERROR(' + error.code + '): ' + error.message);
  // default to Los Angeles
  userLat = 34.0522342;
  userLng = -118.2436849;
  initMap();
}

// initializes map based on whether or not geoloction worked
function initMap() {
  map = new google.maps.Map(document.getElementById('map'));
  map.setCenter(new google.maps.LatLng(userLat, userLng));
  map.setZoom(13);
  map.setMapTypeId(google.maps.MapTypeId.ROADMAP);

//   google.maps.event.addListenerOnce(map, 'idle', function() {
//    google.maps.event.trigger(map, 'resize');
// });
}

// ajax calls
// clicking on each button on the html page results in these ajax calls which dynamically update the webpage
// test of yelp api
$("#yelp").click(function() {
    $.ajax({
        url: "/food/" + userLat + "/" + userLng + "/",
        type:'GET',
        success: function(jsonResp) {
            updateMapYelp(jsonResp);
        }               
    });
});

$("#eventbrite").click(function() {
  $.ajax({
        url: "/events/" + userLat + "/" + userLng + "/",
        type:'GET',
        success: function(jsonResp) {
            updateMapEventbrite(jsonResp);
        }           
    });
})

// test of google search
$("#google").click(function() {
  $.ajax({
        url: "/testjson",
        type:'GET',
        success: function(jsonResp) {
            updateMapGoogle(jsonResp);
        }
  });
});

// populates map with markers from arbitrary test
function updateMapGoogle(input) {
  var myjson = jQuery.parseJSON(input);
  deleteMarkers();
  addMarkersAndInfoGoogle(myjson);
  fitBoundsToMarkers();
}

// helper function for updateMapGoogle
function addMarkersAndInfoGoogle(json) {
    if(json.status == "OK") {
      map.setCenter(new google.maps.LatLng(34.0522342, -118.2436849));
      map.setMapTypeId(google.maps.MapTypeId.ROADMAP);

      json.results.forEach(function(place){

        // Create a marker for each place.
        var marker = makeMarker(map, place.name, place.geometry.location);

        // Create an infoWindow with the place's name for each place
        var infoWindow = makeInfoWindow(place.name);

        // Want to show only one infoWindow at a time
        addListenersToMarker(marker, infoWindow);

        // Push each marker & infoWindow into arrays
        markers.push(marker);
        infoWindows.push(infoWindow);
      });


      }
  }

// populates map with markers from around the user's location
function updateMapYelp(input) {
  var myjson = jQuery.parseJSON(input);
  deleteMarkers();
  labelIndex = 0;
  businesses.length = 0;
  addMarkersAndInfoYelp(myjson);
  fitBoundsToMarkers();
}

// helper function for updateMapYelp
function addMarkersAndInfoYelp(json){
  map.setCenter(new google.maps.LatLng(json.region.center.latitude, json.region.center.longitude));

  json.businesses.forEach(function(place){
      var marker = makeMarker(map, place.name, 
        new google.maps.LatLng({
            lat: place.location.coordinate.latitude,
            lng: place.location.coordinate.longitude
        }));
      var infoWindow = makeInfoWindow(place.name);
      var business = new Business(marker.label, place.name, place.rating, place.is_closed, place.location.display_address, place.display_phone);
      // listener from corresponding infoWindow to marker
      addListenersToMarker(marker, infoWindow);
      markers.push(marker);
      infoWindows.push(infoWindow);
      businesses.push(business);
  });
}

function updateMapEventbrite(input) {
  var myjson = jQuery.parseJSON(input);
  deleteMarkers();
  labelIndex = 0;
  venues.length = 0;
  addMarkersAndInfoEventbrite(myjson);
  // fitBoundsToMarkers();
// map.setCenter(new google.maps.LatLng(userLat, userLng));
//   map.setZoom(13);
}

// helper function for updateMapEventbrite
function addMarkersAndInfoEventbrite(json) {

  var maxNumOfEventsIWant = 10;
  var counter=0;
  json.events.forEach(function(listing) {
      // each event takes place at a venue
      // var venue = getVenue(listing.venue_id);
      var deferredObj = getVenue(listing.venue_id);
      // console.log("got a ven: " + venues[0]);
      // console.log("got a venue: " + venue.address);
      // .then() ensures that the function inside is called after the venue info is loaded
      deferredObj.then(function() {
          console.log("listing name: " + listing.name.text);
          if(counter < maxNumOfEventsIWant) {
              var lastAdded = venues[venues.length - 1];
              var marker = makeMarker(map, listing.name.text, 
              new google.maps.LatLng({
                  lat: lastAdded.latitude,
                  lng: lastAdded.longitude
              }));

              var infoWindow = makeInfoWindow(listing.name.text);
              // listener from corresponding infoWindow to marker
              addListenersToMarker(marker, infoWindow);
              markers.push(marker);
              infoWindows.push(infoWindow);
          }
          counter++;
      });
  });

  
  
}

// function test() {
//   var venue;
//   $.getJSON("test.json", function(json) {
//     // venue = JSON.parse(json);
//     alert(json.address.city);
//   });

// }
// test();

// $.ajax returns a Deferred object
function getVenue(venue_id) {
  var venue;
  return $.ajax({
        url: "/getVenue/" + venue_id + "/",
        type:'GET',
        dataType: 'json',
        success: function(jsonResp) {
            // var ven = jQuery.parseJSON(jsonResp);
            // console.log(ven.address);
            // console.log("jsonResp: " + jsonResp.address);
            venue=new Venue(jsonResp.address.address_1, jsonResp.address.city, jsonResp.address.state, jsonResp.address.postal_code, jsonResp.name, jsonResp.latitude, jsonResp.longitude);
            venues.push(venue);
            // console.log(jsonResp.address.address_1+","+jsonResp.address.city+","+ jsonResp.address.state+","+ 
            //   jsonResp.address.postal_code+","+ jsonResp.name+","+jsonResp.latitude+","+ jsonResp.longitude);
            
        }
  });
  // console.log("ven: " + ven.address.city);
  // return ven;
}

// helper function for initializing maps
// map: the map the marker should be attached to
// title: the title of the marker (appears as a tooltip when hovering over marker)
// position: a google.maps.LatLng object
function makeMarker(map, title, position) {
  return new google.maps.Marker({
    map: map,
    title: title,
    position: position,
    // labels each marker with a different letter of the alphabet
    label: labels[labelIndex++ % labels.length]
  });
}

// helper function for initializing maps
// makes the info window for each marker
function makeInfoWindow(content) {
  return new google.maps.InfoWindow({
      content: content
  });
}

// helper function for initializing maps
// adds click listener to each marker to open an info window, also makes
// sure only one info window open at one time
function addListenersToMarker(marker, infoWindow) {
  marker.addListener('click', function() {
    infoWindow.open(map, marker);
    // Don't want more than one window open at a time
    // TODO: better function for closing the other windows
    infoWindows.forEach(function(item){
      if(item.content!=infoWindow.content)
        item.close();
    });
  });
}

// helper function for initializing maps
// extend the map bounds so that all the markers are shown
function fitBoundsToMarkers(){
  var latLngBounds = new google.maps.LatLngBounds();
  markers.forEach(function(marker) {
    latLngBounds.extend(marker.getPosition());
  });
  map.fitBounds(latLngBounds);
}

// helper function for initializing maps
// removes all the markers from the map
function deleteMarkers() {
    for(var i=0; i<markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
}

// makes sure that when the map is opened in the modal window it refreshes
// $("#map-area").on("show.bs.modal", function () {
//     google.maps.event.addListenerOnce(map, 'idle', function() {
//        google.maps.event.trigger(map, 'resize');
//     });
// });

function Business(index, name, rating, is_closed, address, phone) {
  this.index = index;
  this.name = name;
  this.rating = rating;
  if(is_closed == false)
    this.open = "Open";
  else
    this.open = "Closed";
  this.address = address[0] + " " + address[2];
  this.phone = phone;
  console.log("made a biz, name: "+this.name+", rating: " + this.rating);
}

function Venue(address_1, city, state, postal_code, name, latitude, longitude) {
  this.address = address_1;
  this.city = city;
  this.region = state;
  this.postal_code = parseFloat(postal_code);
  this.name = name;
  this.latitude = parseFloat(latitude);
  this.longitude = parseFloat(longitude);
  console.log("made a ven, lat:"+latitude+", long: "+longitude);
}
  
angular.module("yelpApp", []).controller("YelpCtrl", function($scope) {
  $scope.getBusinesses = function() {
    // google.maps.event.addListenerOnce(map, 'idle', function(){
    $scope.businesses = businesses;
    console.log("in yelpctrl" + $scope.businesses);
    // });
    
  }
});

// function test() {
//   google.maps.event.addListenerOnce(map, 'idle', function() {
//    google.maps.event.trigger(map, 'resize');
// });
// }