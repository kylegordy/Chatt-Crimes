function initialize() {
	// Global Map Options
  var mapOptions = {
    zoom: 14,
    panControl: false,
    mapTypeId: google.maps.MapTypeId.HYBRID
  };
  
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  
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




function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?libraries=visualization&sensor=true&' +
      'callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript;