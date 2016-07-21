// Google maps javascript api documentation
// https://developers.google.com/maps/documentation/javascript/reference

// global variables
    // array of Marker objects
var markers = [],
    // array of infoWindows
    infoWindows = [], 
    // array of Business objects, obtained from yelp api, used for displaying store info in a table
    businesses = [], 
    // google map
    map, 
    // visitor's current location
    // default to los angeles
    userLat = 34.0522342,
    userLng = -118.2436849,
    // have asked user to accept geolocation?
    haveAskedUserLoc = false;
    // labels for map markers, each one letter
    labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    // index of next available label, start from 0 
    labelIndex = 0,
    // array of Venue objects
    venues = [],
    // array of Event objects
    events = [];

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
    // position.coords is the user location returned from HTML5 geolocation api
    userLat = position.coords.latitude;
    userLng = position.coords.longitude;
    updateMap();
}

function errorGeolocation(error)
{
    alert('ERROR(' + error.code + '): ' + error.message);
    // default to Los Angeles if user declines geolocation or error happened
}

// helper function for getLocation()
function updateMap() {
    map.setCenter(new google.maps.LatLng(userLat, userLng));
}

// initializes google map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'));
    map.setCenter(new google.maps.LatLng(userLat, userLng));
    map.setZoom(13);
    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);

    google.maps.event.addListenerOnce(map, 'idle', function() {
        google.maps.event.trigger(map, 'resize');
    });
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

// show the info of each business in #map-modal
function displayYelpInfo() {
    hideElemById("#eventbrite-info");
    showElemById("#yelp-info");
    hideElemById("#eventbrite");
    showElemById("#yelp");
}

// show the info of each event in #map-modal
function displayEventbriteInfo() {
    hideElemById("#yelp-info");
    showElemById("#eventbrite-info");
    hideElemById("#yelp");
    showElemById("#eventbrite");
}

// helper function for display...Info
function showElemById(id) {
    $(id).removeClass("hidden");
}

// helper function for display...Info
function hideElemById(id) {
    $(id).addClass("hidden");
}

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
    // TODO: fitBoundsToMarkers fits bounds to middle of the ocean only for eventbrite
    // fitBoundsToMarkers();
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
    fitBoundsToMarkers();
    // map.setCenter(new google.maps.LatLng(userLat, userLng));
    //   map.setZoom(13);
}

// helper function for updateMapEventbrite
function addMarkersAndInfoEventbrite(json) {
    var latLngBounds = new google.maps.LatLngBounds();
    var maxNumOfEventsIWant = 10;
    var counter = 0;
    json.events.forEach(function(listing) {
        // each event takes place at a venue
        // var venue = getVenue(listing.venue_id);
        var deferredObj = getVenue(listing.venue_id);
        // console.log("got a ven: " + venues[0]);
        // console.log("got a venue: " + venue.address);
        // .then() ensures that the function inside is called after the venue info is loaded
        deferredObj.then(function() {
            // console.log("listing name: " + listing.name.text);
            if(counter < maxNumOfEventsIWant) {
                var lastAdded = venues[venues.length - 1];
                var marker = makeMarker(map, listing.name.text, 
                    new google.maps.LatLng({
                        lat: lastAdded.latitude,
                        lng: lastAdded.longitude
                    })
                );
                // full address:
                // lastAdded.address + ", " + lastAdded.city + ", "+ lastAdded.region + " " + String(lastAdded.postal_code)
                events.push(new Event(marker.label, listing.name.text, lastAdded.city, listing.url));
                // console.log(events[counter]);
                var infoWindow = makeInfoWindow(listing.name.text);
                // listener from corresponding infoWindow to marker
                addListenersToMarker(marker, infoWindow);
                markers.push(marker);
                // latLngBounds.extend(marker.getPosition());
                // console.log("extend " + marker.getPosition().lat() + ", " + marker.getPosition().lng());
                // console.log("markers: " + markers);
                infoWindows.push(infoWindow);
            }
            counter++;
        });
        // fitBoundsToMarkers();
    });
    // map.fitBounds(latLngBounds);

}

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
            console.log("venue response: " + JSON.stringify(jsonResp));
            venue = new Venue(jsonResp.address.address_1, jsonResp.address.city, jsonResp.address.region, jsonResp.address.postal_code, jsonResp.name, jsonResp.latitude, jsonResp.longitude);
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
    var newMarker = new google.maps.Marker({
        map: map,
        title: title,
        position: position,
        // labels each marker with a different letter of the alphabet
        label: labels[labelIndex]
    });
    if(labelIndex < labels.length)
        labelIndex++;
    else
        labelIndex = 0;
    return newMarker;
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
        console.log("trying to fit " + marker.lat() + "," + marker.lng());
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
    markers.length = 0;
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
    // console.log("made a biz, name: "+this.name+", rating: " + this.rating);
}

function Venue(address_1, city, state, postal_code, name, latitude, longitude) {
    this.address = address_1;
    this.city = city;
    this.region = state;
    this.postal_code = postal_code;
    this.name = name;
    this.latitude = parseFloat(latitude);
    this.longitude = parseFloat(longitude);
    // console.log("made a ven, lat:"+latitude+", long: "+longitude);
}

function Event(index, name, address, link) {
    this.index = index;
    this.name = name;
    this.address = address;
    this.link = link;
}
  
var myApp = angular.module("myApp", [])

myApp.controller("YelpCtrl", function($scope) {
    // for #yelp-info
    $scope.getBusinesses = function() {
        // google.maps.event.addListenerOnce(map, 'idle', function(){
        $scope.businesses = businesses;
        console.log("in yelpctrl" + $scope.businesses);
        // });
    }
});

myApp.controller("EventbriteCtrl", function($scope) {
    // for #eventbrite-info
    $scope.getEvents = function() {
        $scope.events = events;
    }
});

$(".open-map-modal").click(function() {
    // once the modal window opens up, then load the google map (otherwise it won't load correctly)
    $("#map-modal").on("show.bs.modal", function(event) {
        if(!haveAskedUserLoc) {
            getLocation();
            initMap();
            haveAskedUserLoc = true;
        }
    });
    $("#map-modal").modal("show");
    // 2 ways of making modal window show up: .modal() (js) or data-toggle="modal" (html)
});
