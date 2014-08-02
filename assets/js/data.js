var constructQueryUrl = function(opts) {
  if (opts.offset === undefined) {
    return "https://data.chattlibrary.org/resource/crime-data.json?code=" + opts.code + "&$select=lat,long,code,casenumber";
  } else {
    return "https://data.chattlibrary.org/resource/crime-data.json?code=" + opts.code + "&$select=lat,long,code,casenumber&$offset=" + opts.offset;
  }
};

/* Process new data into object of casenumbers and coordinates,
   then merge that into previously processed data. Removes duplicate records with same casenumber */
var processData = function(sourcedta, newdta) {
    return _.chain(newdta)
      .map(function(dta) { return _.object([dta.casenumber], [new google.maps.LatLng(dta.lat, dta.long)]); })
      .reduce(function(a, b) { return _.merge(a,b)})
      .merge(sourcedta)
      .value();
};

var calculateOffset = function(offset, page) {
  if (offset === undefined) {
    return page;
  } else {
    return offset + page;
  }
};

var getDataWithCode = function(opts, cb) {

  $.getJSON(constructQueryUrl(opts), function(data) {
    if (data.length == 1000) {
      getDataWithCode({
        code: opts.code,
        /* We're assuming empty object isn't being passed in,
           make it if it's not */
        data: processData(_.isObject(opts.data) ? opts.data : {}, data),
        offset: calculateOffset(opts.offset, 1000)
      }, cb);
    }
    else {
      return cb(_.values(processData(opts.data, data)));
    }
  });
 
};
