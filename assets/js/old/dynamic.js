var map, pointarray, heatmap;
var burglaryData = [];
//justin
//jquery to pull json into burglaryData array
var y = [];

function initialize() {
  alert("'shits and giggles'");
  jQuery.getJSON('http://opendata.chattlibrary.org/api/action/datastore/search.json?resource_id=7cefb5e8-f0be-4fca-ad3e-ef6cf4ac45a5&limit=20&filter[code]=120', function(data) {
      // alert("'Key = '");
      $.each(data.records, function(index, value) {
          if ($.inArray(value.casenumber, y)==-1){
              if(value.casenumber != ""){
                  if(value.lat != "0" ){
                    y.push(new google.maps.LatLng(data.records[index].lat,data.records[index].lon));
                    burglaryData.push(new google.maps.LatLng(value.lat, value.lon));

                  }
              }
          }
      });
  });
  alert(y);
  alert(burglaryData);
	// Global Map Options
  var mapOptions = {
    zoom: 15,
    panControl: false,
    zoomControl: false,
    // Code below loaded Chattanooga first then proceeded to geolocate your position
    /* center: new google.maps.LatLng(35.04563, -85.30968), */
    mapTypeId: google.maps.MapTypeId.HYBRID
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
   
  // Heatmap
  var pointArray = new google.maps.MVCArray(burglaryData);

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray,
    radius: 25,
    maxIntensity: 10,
    opacity: 0.75
  });

  heatmap.setMap(map);
  
	// Geolocation
  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
                                      
      // Geolocation Marker Icon                                 
      var infowindow = new google.maps.Marker({
        map: map,
        position: pos,
        title: 'Your Location',
        icon: 'http://kylegordydesign.com/chatt-crimes-beta/images/icons/map-icon.png',
        animation: google.maps.Animation.DROP
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(35.04563, -85.30968),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

// Button Variables
function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

// Change Gradient Button
function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.setOptions({
    gradient: heatmap.get('gradient') ? null : gradient
  });
}

// Initialize Map
google.maps.event.addDomListener(window, 'load', initialize);