var map;
var grayStyles = [
{
  featureType: "all",
  stylers: [
  { saturation: -90 },
  { lightness: 10 }
  ]
},
];
function initialize() {
var mapOptions = {
center: new google.maps.LatLng(55.766172,37.601609),
zoom: 17,
scrollwheel: false,
styles: grayStyles,
center: new google.maps.LatLng(55.766172,37.601609),
mapTypeId: google.maps.MapTypeId.ROADMAP
};
map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	var image = '/images/design/baloon.png';
var myLatLng = new google.maps.LatLng(55.766172,37.601609);
var beachMarker = new google.maps.Marker({
  position: myLatLng,
  map: map,
  icon: image
});
}
google.maps.event.addDomListener(window, 'load', initialize);