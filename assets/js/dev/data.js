var MapData = MapData || {};

MapData.codeToQuery = function(code) {
  return "code = " + "'" + code + "'";
};

MapData.codesQuery = function(codes) {
  return $.map(codes, function(c) { return MapData.codeToQuery(c); }).join(' OR ');
};

MapData.constructQueryUrlParams = function(opts) {
  return $.param({
    '$select': "lat,long,code,casenumber",
    '$where': MapData.codesQuery(opts.codes),
    '$offset': opts.offset === undefined ? 0 : opts.offset
  });
};

MapData.constructQueryUrl = function(opts) {
  return "https://data.chattlibrary.org/resource/crime-data.json?" + MapData.constructQueryUrlParams(opts);
};

MapData.calculateOffset = function(offset, page) {
  if (offset === undefined) {
    return page;
  } else {
    return offset + page;
  }
};

MapData.getDataWithCodes = function(opts, cb) {

  $.getJSON(MapData.constructQueryUrl(opts), function(data) {
    var casenumbers = $.isPlainObject(opts.casenumbers) ? opts.casenumbers : {},
      i = data.length - 1;

    do {
      if (casenumbers[data[i].casenumber] === undefined){
        casenumbers[data[i].casenumber] = true;
        opts.points.push(new google.maps.LatLng(data[i].lat, data[i].long));
      }
    } while (i--);

    if (data.length == 1000) {
      MapData.getDataWithCodes({
        codes: opts.codes,
        casenumbers: casenumbers,
        points: opts.points,
        offset: MapData.calculateOffset(opts.offset, 1000)
      }, cb);
    }
    else {
      return cb();
    }
  });

};
