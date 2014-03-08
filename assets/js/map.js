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
  var pointArray = new google.maps.MVCArray(aggravatedAssault);

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


function selectedData(crimeType){
  heatmap.setMap();

  if (crimeType === 'autoTheft')
    {
      pointArray = autoTheft;
    }
  else if (crimeType === 'aggravatedAssault')
    {
      pointArray = aggravatedAssault;
    }
  else if (crimeType === 'burglary')
    {
      pointArray = burglary;
    }
  else if (crimeType === 'homicide')
    {
      pointArray = homicide;
    }
  else if (crimeType === 'theft')
    {
      pointArray = theft;
    }
  else if (crimeType === 'drugs')
    {
      pointArray = drugs;
    }
 

  // pointArray = autoTheft;
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray,
    radius: 25,
    maxIntensity: 10,
    opacity: 0.75
  });

  heatmap.setMap(map);

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

// Initialize Map
google.maps.event.addDomListener(window, 'load', initialize);