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
  map.setZoom(17);
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


// function to reset background colors of menu items
function resetMenuBackground() {
  document.getElementById('myLocation').style.background ='';
  document.getElementById('aggravatedAssault').style.background ='';
  document.getElementById('autoTheft').style.background ='';
  document.getElementById('burglary').style.background ='';
  document.getElementById('drugs').style.background ='';
  document.getElementById('homicide').style.background ='';
  document.getElementById('theft').style.background ='';
}

// Set heatmap in select crime function
function setHeatMap(pointArray) {

  heatmap.setMap();
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray,
    radius: 25,
    maxIntensity: 10,
    opacity: 0.75
  });

  heatmap.setMap(map);

}

// Select Crime Function
function selectedData(crimeType){
  resetMenuBackground();
  if (crimeType === 'autoTheft')
    {
      spinner.spin($("#map-canvas")[0]);
      getDataWithCodes({codes: ['240']}, function(data){
        pointArray = data;
        document.getElementById('autoTheft').style.background ='#c3ffc3';
        setHeatMap(pointArray);
        spinner.stop();
      });
    }
  else if (crimeType === 'aggravatedAssault')
    {
      spinner.spin($("#map-canvas")[0]);
      getDataWithCodes({codes: ['13A']}, function(data){
        pointArray = data;
        document.getElementById('aggravatedAssault').style.background ='#c3ffc3';
        setHeatMap(pointArray);
        spinner.stop();
      });
    }
  else if (crimeType === 'burglary')
    {
      spinner.spin($("#map-canvas")[0]);
      getDataWithCodes({codes: ['220']}, function(data){
        pointArray = data;
        document.getElementById('burglary').style.background ='#c3ffc3';
        setHeatMap(pointArray);
        spinner.stop();
      });
    }
  else if (crimeType === 'homicide')
    {
      spinner.spin($("#map-canvas")[0]);
      getDataWithCodes({codes: ['09A']}, function(data){
        pointArray = data;
        document.getElementById('homicide').style.background ='#c3ffc3';
        setHeatMap(pointArray);
        spinner.stop();
      });
    }
  else if (crimeType === 'theft')
    {
      spinner.spin($("#map-canvas")[0]);
      getDataWithCodes({codes: ['23A','23B','23C','23D','23E','23F','23G','23H']}, function(data){
        pointArray = data;
        document.getElementById('theft').style.background ='#c3ffc3';
        setHeatMap(pointArray);
        spinner.stop();
      });
    }
  else if (crimeType === 'drugs')
    {
      spinner.spin($("#map-canvas")[0]);
      getDataWithCodes({codes: ['35A']}, function(data){
        pointArray = data;
        document.getElementById('drugs').style.background ='#c3ffc3';
        setHeatMap(pointArray);
        spinner.stop();
      });
    }


}

// Initialize Map
google.maps.event.addDomListener(window, 'load', initMap);
function initMap() {

  var mapOptions = {
    center: new google.maps.LatLng(35.04563, -85.30968),
    zoom: 15,
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

  getDataWithCodesFaster({codes: ['13A'], points: pointArray}, function(data){
    spinner.stop();
  });

}
