function showlocation(){navigator.geolocation.getCurrentPosition(callback,errorHandler)}function callback(t){var e=t.coords.latitude,a=t.coords.longitude,n=new google.maps.LatLng(e,a),o=new google.maps.Marker({position:n,icon:"assets/images/icons/map-icon.png",animation:google.maps.Animation.DROP});o.setMap(map),map.setZoom(18),map.setCenter(o.getPosition())}function errorHandler(t){switch(t.code){case t.PERMISSION_DENIED:alert("User denied the request for Geolocation.");break;case t.POSITION_UNAVAILABLE:alert("Location information is unavailable.");break;case t.TIMEOUT:alert("The request to get user location timed out.");break;case t.UNKNOWN_ERROR:alert("An unknown error occurred.")}}function selectedData(t){"autoTheft"===t?(pointArray.clear(),spinner.spin($("#map-canvas")[0]),MapData.getDataWithCodes({codes:["240"],points:pointArray},function(){spinner.stop()})):"aggravatedAssault"===t?(pointArray.clear(),spinner.spin($("#map-canvas")[0]),MapData.getDataWithCodes({codes:["13A"],points:pointArray},function(){spinner.stop()})):"burglary"===t?(pointArray.clear(),spinner.spin($("#map-canvas")[0]),MapData.getDataWithCodes({codes:["220"],points:pointArray},function(){spinner.stop()})):"homicide"===t?(pointArray.clear(),spinner.spin($("#map-canvas")[0]),MapData.getDataWithCodes({codes:["09A"],points:pointArray},function(){spinner.stop()})):"theft"===t?(pointArray.clear(),spinner.spin($("#map-canvas")[0]),MapData.getDataWithCodes({codes:["23A","23B","23C","23D","23E","23F","23G","23H"],points:pointArray},function(){spinner.stop()})):"drugs"===t?(pointArray.clear(),spinner.spin($("#map-canvas")[0]),MapData.getDataWithCodes({codes:["35A"],points:pointArray},function(){spinner.stop()})):"vandalism"===t&&(pointArray.clear(),spinner.spin($("#map-canvas")[0]),MapData.getDataWithCodes({codes:["290"],points:pointArray},function(){spinner.stop()}))}function initMap(){var t={center:new google.maps.LatLng(35.04563,-85.30968),zoom:14,panControl:!1,zoomControl:!0,mapTypeId:google.maps.MapTypeId.HYBRID};map=new google.maps.Map(document.getElementById("map-canvas"),t),pointArray=new google.maps.MVCArray,spinner.spin($("#map-canvas")[0]),heatmap=new google.maps.visualization.HeatmapLayer({data:pointArray,radius:25,maxIntensity:10,opacity:.75}),heatmap.setMap(map),MapData.getDataWithCodes({codes:["13A"],points:pointArray},function(){spinner.stop()})}!function(t,e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Spinner=e()}(this,function(){"use strict";function t(t,e){var a,n=document.createElement(t||"div");for(a in e)n[a]=e[a];return n}function e(t){for(var e=1,a=arguments.length;a>e;e++)t.appendChild(arguments[e]);return t}function a(t,e,a,n){var o=["opacity",e,~~(100*t),a,n].join("-"),i=.01+100*(a/n),r=Math.max(1-(1-t)/e*(100-i),t),s=c.substring(0,c.indexOf("Animation")).toLowerCase(),p=s&&"-"+s+"-"||"";return d[o]||(u.insertRule("@"+p+"keyframes "+o+"{0%{opacity:"+r+"}"+i+"%{opacity:"+t+"}"+(i+.01)+"%{opacity:1}"+(i+e)%100+"%{opacity:"+t+"}100%{opacity:"+r+"}}",u.cssRules.length),d[o]=1),o}function n(t,e){var a,n,o=t.style;for(e=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<l.length;n++)if(a=l[n]+e,void 0!==o[a])return a;return void 0!==o[e]?e:void 0}function o(t,e){for(var a in e)t.style[n(t,a)||a]=e[a];return t}function i(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)void 0===t[n]&&(t[n]=a[n])}return t}function r(t,e){return"string"==typeof t?t:t[e%t.length]}function s(t){this.opts=i(t||{},s.defaults,f)}function p(){function a(e,a){return t("<"+e+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',a)}u.addRule(".spin-vml","behavior:url(#default#VML)"),s.prototype.lines=function(t,n){function i(){return o(a("group",{coordsize:l+" "+l,coordorigin:-c+" "+-c}),{width:l,height:l})}function s(t,s,p){e(u,e(o(i(),{rotation:360/n.lines*t+"deg",left:~~s}),e(o(a("roundrect",{arcsize:n.corners}),{width:c,height:n.width,left:n.radius,top:-n.width>>1,filter:p}),a("fill",{color:r(n.color,t),opacity:n.opacity}),a("stroke",{opacity:0}))))}var p,c=n.length+n.width,l=2*c,d=2*-(n.width+n.length)+"px",u=o(i(),{position:"absolute",top:d,left:d});if(n.shadow)for(p=1;p<=n.lines;p++)s(p,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(p=1;p<=n.lines;p++)s(p);return e(t,u)},s.prototype.opacity=function(t,e,a,n){var o=t.firstChild;n=n.shadow&&n.lines||0,o&&e+n<o.childNodes.length&&(o=o.childNodes[e+n],o=o&&o.firstChild,o=o&&o.firstChild,o&&(o.opacity=a))}}var c,l=["webkit","Moz","ms","O"],d={},u=function(){var a=t("style",{type:"text/css"});return e(document.getElementsByTagName("head")[0],a),a.sheet||a.styleSheet}(),f={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",position:"absolute"};s.defaults={},i(s.prototype,{spin:function(e){this.stop();var a=this,n=a.opts,i=a.el=o(t(0,{className:n.className}),{position:n.position,width:0,zIndex:n.zIndex});if(n.radius+n.length+n.width,o(i,{left:n.left,top:n.top}),e&&e.insertBefore(i,e.firstChild||null),i.setAttribute("role","progressbar"),a.lines(i,a.opts),!c){var r,s=0,p=(n.lines-1)*(1-n.direction)/2,l=n.fps,d=l/n.speed,u=(1-n.opacity)/(d*n.trail/100),f=d/n.lines;!function m(){s++;for(var t=0;t<n.lines;t++)r=Math.max(1-(s+(n.lines-t)*f)%d*u,n.opacity),a.opacity(i,t*n.direction+p,r,n);a.timeout=a.el&&setTimeout(m,~~(1e3/l))}()}return a},stop:function(){var t=this.el;return t&&(clearTimeout(this.timeout),t.parentNode&&t.parentNode.removeChild(t),this.el=void 0),this},lines:function(n,i){function s(e,a){return o(t(),{position:"absolute",width:i.length+i.width+"px",height:i.width+"px",background:e,boxShadow:a,transformOrigin:"left",transform:"rotate("+~~(360/i.lines*l+i.rotate)+"deg) translate("+i.radius+"px,0)",borderRadius:(i.corners*i.width>>1)+"px"})}for(var p,l=0,d=(i.lines-1)*(1-i.direction)/2;l<i.lines;l++)p=o(t(),{position:"absolute",top:1+~(i.width/2)+"px",transform:i.hwaccel?"translate3d(0,0,0)":"",opacity:i.opacity,animation:c&&a(i.opacity,i.trail,d+l*i.direction,i.lines)+" "+1/i.speed+"s linear infinite"}),i.shadow&&e(p,o(s("#000","0 0 4px #000"),{top:"2px"})),e(n,e(p,s(r(i.color,l),"0 0 1px rgba(0,0,0,.1)")));return n},opacity:function(t,e,a){e<t.childNodes.length&&(t.childNodes[e].style.opacity=a)}});var m=o(t("group"),{behavior:"url(#default#VML)"});return!n(m,"transform")&&m.adj?p():c=n(m,"animation"),s});var MapData=MapData||{};MapData.codeToQuery=function(t){return"code = '"+t+"'"},MapData.codesQuery=function(t){return $.map(t,function(t){return MapData.codeToQuery(t)}).join(" OR ")},MapData.constructQueryUrlParams=function(t){return $.param({$select:"lat,long,code,casenumber",$where:MapData.codesQuery(t.codes),$offset:void 0===t.offset?0:t.offset})},MapData.constructQueryUrl=function(t){return"https://data.chattlibrary.org/resource/crime-data.json?"+MapData.constructQueryUrlParams(t)},MapData.calculateOffset=function(t,e){return void 0===t?e:t+e},MapData.getDataWithCodes=function(t,e){$.getJSON(MapData.constructQueryUrl(t),function(a){var n=$.isPlainObject(t.casenumbers)?t.casenumbers:{},o=a.length-1;do void 0===n[a[o].casenumber]&&(n[a[o].casenumber]=!0,t.points.push(new google.maps.LatLng(a[o].lat,a[o].long)));while(o--);return 1e3!=a.length?e():void MapData.getDataWithCodes({codes:t.codes,casenumbers:n,points:t.points,offset:MapData.calculateOffset(t.offset,1e3)},e)})};var map=null,pointArray,heatmap,opts={lines:17,length:20,width:10,radius:36,corners:1,rotate:0,direction:1,color:"#fff",speed:1,trail:100,shadow:!1,hwaccel:!1,className:"spinner",zIndex:2e9,top:"50%",left:"50%"},spinner=new Spinner(opts).spin();google.maps.event.addDomListener(window,"load",initMap),$(document).ready(function(){$("#menu").click(function(){$("html").toggleClass("active-sidebar")}),$(".map-wraper nav a").click(function(){$("nav a").removeClass("selected"),$(this).addClass("selected")})});