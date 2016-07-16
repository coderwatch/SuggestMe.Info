var markers = [], infoWindows = [], map, userLat, userLng;

function initMap() {
  initMapOnUserLocation();
}

function updateMapGoogle(input) {
  var myjson = jQuery.parseJSON(input);
  deleteMarkers();
  addMarkersAndInfoGoogle(myjson);
  fitBoundsToMarkers();
}

function addMarkersAndInfoGoogle(json) {
    // "result.json"
    if(json.status == "OK") {
      // map = new google.maps.Map(document.getElementById('map'), {
      //   center: {lat: 34.0522342, lng: -118.2436849},
      //   zoom: 13,
      //   mapTypeId: google.maps.MapTypeId.ROADMAP
      // });
      map.setCenter(new google.maps.LatLng(34.0522342, -118.2436849));
      map.setMapTypeId(google.maps.MapTypeId.ROADMAP);

      json.results.forEach(function(place){
        // console.log("found " + place.name);
        // var icon = {
        //   url: place.icon,
        //   size: new google.maps.Size(71, 71),
        //   origin: new google.maps.Point(0, 0),
        //   anchor: new google.maps.Point(17, 34),
        //   scaledSize: new google.maps.Size(25, 25)
        // };

        // Create a marker for each place.
        // var marker = new google.maps.Marker({
        //   map: map,
        //   title: place.name,
        //   position: place.geometry.location
        // });
        var marker = makeMarker(map, place.name, place.geometry.location);

        // Create an infoWindow with the place's name for each place
        // var infoWindow = new google.maps.InfoWindow({
        //     content: place.name
        // });
        var infoWindow = makeInfoWindow(place.name);

        // Want to show only one infoWindow at a time
        // marker.addListener('click', function() {
        //   infoWindow.open(map, marker);
        //   infoWindows.forEach(function(item){
        //     if(item.content!=infoWindow.content)
        //       item.close();
        //   });
        // });
        addListenersToMarker(marker, infoWindow);

        // Push each marker & infoWindow into arrays
        markers.push(marker);
        infoWindows.push(infoWindow);
      });


      }
  }

// map: the map the marker should be attached to
// title: the title of the marker (appears as a tooltip when hovering over marker)
// position: a google.maps.LatLng object
function makeMarker(map, title, position) {
  return new google.maps.Marker({
    map: map,
    title: title,
    position: position
  });
}

function makeInfoWindow(content) {
  // console.log("makeInfoWindow - "+content);
  return new google.maps.InfoWindow({
      content: content
  });
}

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

function fitBoundsToMarkers(){
  var latLngBounds = new google.maps.LatLngBounds();
  markers.forEach(function(marker) {
    latLngBounds.extend(marker.getPosition());

  });
  map.fitBounds(latLngBounds);
}

function updateMapYelp(input) {
  var myjson = jQuery.parseJSON(input);
  deleteMarkers();
  addMarkersAndInfoYelp(myjson);
  fitBoundsToMarkers();
  // function(json) {
  //   // "yelpResult.json"
  //     // var map = new google.maps.Map(document.getElementById('map'), {
  //     //   center: {
  //     //     lat: json.region.center.latitude, 
  //     //     lng: json.region.center.longitude
  //     //   },
  //     //   zoom: 13,
  //     //   mapTypeId: google.maps.MapTypeId.ROADMAP
  //     // });

  //     map.setCenter(new google.maps.LatLng(json.region.center.latitude, json.region.center.longitude));
  //     map.setZoom(13);
  //     map.setMapTypeId(google.maps.MapTypeId.ROADMAP);

  //     json.businesses.forEach(function(place){
  //       console.log("found " + place.name);

  //       // Create a marker for each place.
  //       var marker = new google.maps.Marker({
  //         map: map,
  //         title: place.name,
  //         position: new google.maps.LatLng({
  //           lat: place.location.coordinate.latitude,
  //           lng: place.location.coordinate.longitude
  //         })
  //       });

  //       // Create an infoWindow with the place's name for each place
  //       var infoWindow = new google.maps.InfoWindow({
  //           content: place.name
  //       });

  //       // Want to show only one infoWindow at a time
  //       marker.addListener('click', function() {
  //         infoWindow.open(map, marker);
  //         infoWindows.forEach(function(item){
  //           if(item.content!=infoWindow.content)
  //             item.close();
  //         });
  //       });

  //       // Push each marker & infoWindow into arrays
  //       markers.push(marker);
  //       infoWindows.push(infoWindow);
  //     });

  // });
}

function addMarkersAndInfoYelp(json){
  map.setCenter(new google.maps.LatLng(json.region.center.latitude, json.region.center.longitude));
  map.setZoom(13);
  map.setMapTypeId(google.maps.MapTypeId.ROADMAP);

  json.businesses.forEach(function(place){
      var marker = makeMarker(map, place.name, 
        new google.maps.LatLng({
            lat: place.location.coordinate.latitude,
            lng: place.location.coordinate.longitude
        }));
      var infoWindow = makeInfoWindow(place.name);
      addListenersToMarker(marker, infoWindow);
      markers.push(marker);
      infoWindows.push(infoWindow);
  });
}

function deleteMarkers() {
    for(var i=0; i<markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
}

//  The navigator object contains information about the browser.
function initMapOnUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successGeolocation, errorGeolocation);
    } 
    else { 
        alert("Geolocation is not supported by this browser.");
    }

}

function successGeolocation(position)
{
  userLat = position.coords.latitude;
  userLng = position.coords.longitude;
  map = new google.maps.Map(document.getElementById('map'));
  map.setCenter(new google.maps.LatLng(userLat, userLng));
  map.setZoom(13);
  map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
}

function errorGeolocation(error)
{
  alert('ERROR(' + error.code + '): ' + error.message);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

$('#yelp').click(function() {
  
    $.ajax({
        url: "/food/" + userLat + "/" + userLng + "/",
        type:'GET',
        success: function(jsonResp)
        {
            updateMapYelp(jsonResp);
        }               
    });
});

$('#google').click(function() {
  $.ajax({
      url: "/testjson",
        type:'GET',
        success: function(jsonResp)
        {
            updateMapGoogle(jsonResp);
        }
  });
});