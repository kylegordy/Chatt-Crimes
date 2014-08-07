var map = null,
  pointArray,
  heatmap,
  opts = {
    lines: 17, // The number of lines to draw
    length: 20, // The length of each line
    width: 10, // The line thickness
    radius: 36, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#fff', // #rgb or #rrggbb or array of colors
    speed: 1, // Rounds per second
    trail: 100, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: '50%', // Top position relative to parent
    left: '50%' // Left position relative to parent
  },
  spinner = new Spinner(opts).spin();


// Find Location Function
function showlocation() {
    // One-shot position request.
    navigator.geolocation.getCurrentPosition(callback, errorHandler);
}

// Locate the position
function callback(position) {

  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

  var latLong = new google.maps.LatLng(lat, lon);

  var marker = new google.maps.Marker({
      position: latLong,
      icon: 'assets/images/icons/map-icon.png',
      animation: google.maps.Animation.DROP
  });

  marker.setMap(map);
  map.setZoom(18);
  map.setCenter(marker.getPosition());
}

// Geolocation Error Handler
function errorHandler(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
    }
  }


// Select Crime Function
function selectedData(crimeType){
  if (crimeType === 'autoTheft')
    {
      pointArray.clear();
      spinner.spin($("#map-canvas")[0]);

      MapData.getDataWithCodes({codes: ['240'], points: pointArray}, function(){
        spinner.stop();
      });
    }
  else if (crimeType === 'aggravatedAssault')
    {
      pointArray.clear();
      spinner.spin($("#map-canvas")[0]);

      MapData.getDataWithCodes({codes: ['13A'], points: pointArray}, function(){
        spinner.stop();
      });
    }
  else if (crimeType === 'burglary')
    {
      pointArray.clear()
      spinner.spin($("#map-canvas")[0]);

      MapData.getDataWithCodes({codes: ['220'], points: pointArray}, function(){
        spinner.stop();
      });
    }
  else if (crimeType === 'homicide')
    {
      pointArray.clear()
      spinner.spin($("#map-canvas")[0]);

      MapData.getDataWithCodes({codes: ['09A'], points: pointArray}, function(){
        spinner.stop();
      });
    }
  else if (crimeType === 'theft')
    {
      pointArray.clear();
      spinner.spin($("#map-canvas")[0]);

      MapData.getDataWithCodes({codes: ['23A','23B','23C','23D','23E','23F','23G','23H'], points: pointArray}, function(){
        spinner.stop();
      });
    }
  else if (crimeType === 'drugs')
    {
      pointArray.clear();
      spinner.spin($("#map-canvas")[0]);

      MapData.getDataWithCodes({codes: ['35A'], points: pointArray}, function(data){
        spinner.stop();
      });
    }
  else if (crimeType === 'vandalism')
    {
      pointArray.clear();
      spinner.spin($("#map-canvas")[0]);

      MapData.getDataWithCodes({codes: ['290'], points: pointArray}, function(data){
        spinner.stop();
      });
    }


}

// Initialize Map
google.maps.event.addDomListener(window, 'load', initMap);
function initMap() {

  var mapOptions = {
    center: new google.maps.LatLng(35.04563, -85.30968),
    zoom: 14,
    panControl: false,
    zoomControl: true,
    mapTypeId: google.maps.MapTypeId.HYBRID
  };

  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  // Display Heatmap
  pointArray = new google.maps.MVCArray();

  spinner.spin($("#map-canvas")[0]);
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray,
    radius: 25,
    maxIntensity: 10,
    opacity: 0.75
  });

  heatmap.setMap(map);

  MapData.getDataWithCodes({codes: ['13A'], points: pointArray}, function(data){
    spinner.stop();
  });

}
