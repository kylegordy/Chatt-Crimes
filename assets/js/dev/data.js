var codeToQuery = function(code) {
  return "code = " + "'" + code + "'";
};

var codeQuery = function(codes) {
  return $.map(codes, function(c) { return codeToQuery(c); }).join(' OR ');
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

var calculateOffset = function(offset, page) {
  if (offset === undefined) {
    return page;
  } else {
    return offset + page;
  }
};

var getDataWithCodes = function(opts, cb) {

  $.getJSON(constructQueryUrl(opts), function(data) {
    var casenumbers = _.isObject(opts.casenumbers) ? opts.casenumbers : {};

    _.forEach(data, function(d) {
      if (casenumbers[d.casenumber] === undefined){
        casenumbers[d.casenumber] = true;
        opts.points.push(new google.maps.LatLng(d.lat, d.long));
      }
    });

    if (data.length == 1000) {
      getDataWithCodes({
        codes: opts.codes,
        casenumbers: casenumbers,
        points: opts.points,
        offset: calculateOffset(opts.offset, 1000)
      }, cb);
    }
    else {
      return cb();
    }
  });

};
