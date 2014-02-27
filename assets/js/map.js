var map, pointarray, heatmap;

function initialize() {

  // Global Map Options
  var mapOptions = {
    zoom: 15,
    panControl: false,
    zoomControl: false,
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
        icon: 'assets/images/icons/map-icon.png',
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

// Geolocation Error Notice
function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  // if geolocation fails marker will fallbacks to Chattanooga
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