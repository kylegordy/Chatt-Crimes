var codeQuery = function(codes) {
  return _.chain(codes)
    .map(function(code) { return "code = " + "'" + code + "'"; })
    .reduce(function(a, b) { return a + " OR " + b; })
    .value();
};

var constructQueryUrlParams = function(opts) {
  return $.param({
    '$select': "lat,long,code,casenumber",
    '$where': codeQuery(opts.codes),
    '$offset': opts.offset === undefined ? 0 : opts.offset
  });
};

var constructQueryUrl = function(opts) {
    return "https://data.chattlibrary.org/resource/crime-data.json?" + constructQueryUrlParams(opts);
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

var getDataWithCodes = function(opts, cb) {

  $.getJSON(constructQueryUrl(opts), function(data) {
    if (data.length == 1000) {
      getDataWithCodes({
        codes: opts.codes,
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

var getDataWithCodesFaster = function(opts, cb) {

  $.getJSON(constructQueryUrl(opts), function(data) {
    var casenumbers = _.isObject(opts.casenumbers) ? opts.casenumbers : {};

    if (_.isObject(opts.casenumbers)) {
      _.forEach(data, function(d) {
        if (!opts.casenumbers[d.casenumber]){
          casenumbers[d.casenumber] = true;
          opts.points.push(new google.maps.LatLng(d.lat, d.long));
        }
      });
    } else {
      _.forEach(data, function(d) {
        casenumbers[d.casenumber] = true;
        opts.points.push(new google.maps.LatLng(d.lat, d.long));
      });
    }


    if (data.length == 1000) {
      getDataWithCodesFaster({
        codes: opts.codes,
        /* We're assuming empty object isn't being passed in,
           make it if it's not */
        casenumbers: casenumbers,
        points: opts.points,
        offset: calculateOffset(opts.offset, 1000)
      }, cb);
    }
    else {
     console.log( _.values(casenumbers).length);
      return cb();
    }
  });

};
