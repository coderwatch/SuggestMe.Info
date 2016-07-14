var markers = [], infoWindows = [], map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'));
  updateMapGoogle("{status='OK'}");
}

function updateMapGoogle(input) {
  var myjson = jQuery.parseJSON(input);
  function next(json) {
    // "result.json"
    if(json.status == "OK") {
      // map = new google.maps.Map(document.getElementById('map'), {
      //   center: {lat: 34.0522342, lng: -118.2436849},
      //   zoom: 13,
      //   mapTypeId: google.maps.MapTypeId.ROADMAP
      // });
      map.setCenter(new google.maps.LatLng(34.0522342, -118.2436849));
      map.setZoom(13);
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
        var marker = new google.maps.Marker({
          map: map,
          title: place.name,
          position: place.geometry.location
        });

        // Create an infoWindow with the place's name for each place
        var infoWindow = new google.maps.InfoWindow({
            content: place.name
        });

        // Want to show only one infoWindow at a time
        marker.addListener('click', function() {
          infoWindow.open(map, marker);
          infoWindows.forEach(function(item){
            if(item.content!=infoWindow.content)
              item.close();
          });
        });

        // Push each marker & infoWindow into arrays
        markers.push(marker);
        infoWindows.push(infoWindow);
      });


      }
  }
next(myjson);
}

// function updateMapGoogle(){

// }

// google.maps.event.addDomListener($('#map'), 'center_changed', function()
//   {
//     initMapYelp()
//   });

function updateMapYelp(input) {
  $.parseJSON(input, function(json) {
    // "yelpResult.json"
      // var map = new google.maps.Map(document.getElementById('map'), {
      //   center: {
      //     lat: json.region.center.latitude, 
      //     lng: json.region.center.longitude
      //   },
      //   zoom: 13,
      //   mapTypeId: google.maps.MapTypeId.ROADMAP
      // });

      map.setCenter(new google.maps.LatLng(json.region.center.latitude, json.region.center.longitude));
      map.setZoom(13);
      map.setMapTypeId(google.maps.MapTypeId.ROADMAP);

      json.businesses.forEach(function(place){
        console.log("found " + place.name);

        // Create a marker for each place.
        var marker = new google.maps.Marker({
          map: map,
          title: place.name,
          position: new google.maps.LatLng({
            lat: place.location.coordinate.latitude,
            lng: place.location.coordinate.longitude
          })
        });

        // Create an infoWindow with the place's name for each place
        var infoWindow = new google.maps.InfoWindow({
            content: place.name
        });

        // Want to show only one infoWindow at a time
        marker.addListener('click', function() {
          infoWindow.open(map, marker);
          infoWindows.forEach(function(item){
            if(item.content!=infoWindow.content)
              item.close();
          });
        });

        // Push each marker & infoWindow into arrays
        markers.push(marker);
        infoWindows.push(infoWindow);
      });

  });
}

// function updateMapYelp(){

// }

// google.maps.Map.prototype.clearOverlays = function() {
//   for (var i = 0; i < markers.length; i++ ) {
//     markers[i].setMap(null);
//   }
//   markers.length = 0;
// }
function deleteMarkers() {
    clearMarkers();
    markers = [];
}



var x = document.getElementById("myPos");
//  The navigator object contains information about the browser.
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } 
    else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
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

$('#yelp').click(function()
{
    $.ajax({
        url: "/food/Pomona,ca",
        type:'GET',
        success: function(jsonResp)
        {
            updateMapYelp(jsonResp);
        }               
    });
});

$('#google').click(function()
{
  $.ajax({
      url: "/testjson",
        type:'GET',
        success: function(jsonResp)
        {
            updateMapGoogle(jsonResp);
        }
  });
});