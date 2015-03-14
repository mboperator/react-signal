var React = require('react');
var l = require('leaflet');
var UserActions = require('./actions/UserActions');

var tileset = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var attribution = 'Map data <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
l.Icon.Default.imagePath = '/images';

var users = [
  {
    "name": "marcus",
    "lat": 40.226262,
    "long": -111.660985
  },
  {
    "name": "christian",
    "lat": 40.3,
    "long": -111.560985
  },
  {
    "name": "michael",
    "lat": 40.22262,
    "long": -111.5
  },
  {
    "name": "ryan",
    "lat": 40.227,
    "long": -111.6
  },
  {
    "name": "tyler",
    "lat": 40.226,
    "long": -111.69
  },
];

var map = React.createClass({
  componentDidMount: function() {
    this.getCurrentLocation();
    var node = this.refs.map.getDOMNode();
    this.map = l.map(node);
    this.map.setView([this.state.lat, this.state.long], 5);
    l.tileLayer(tileset, { attribution: attribution, minZoom: 1, }).addTo(this.map);
    this.plotFriends(users);
    this.castNet(500);
  },
  getInitialState: function() {
    return {//This is Murica for now
      'lat': 38.841755,
      'long': -98.222856,
      'friends': users
    };
  },
  getLocation: function() {
    return {
      "lat": this.state.lat,
      "long": this.state.long
    };
  },
  getCurrentLocation: function() {// getCurrentPosition uses the callback showPosition to update map coords
    if (navigator.geolocation) {// If the browser doesn't allow it, just stay on Murica for now
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      this.showPosition({latitude: 40.226262, longitude: -111.660985});
    }
  },
  showPosition: function(position) {
    var loc = {
      'lat': position.coords.latitude,
      'long': position.coords.longitude
    };
    UserActions.setLocation(loc);
    this.setState(loc);
    this.map.setView([this.state.lat, this.state.long], 9);
  },
  castNet: function(radius) {
    l.circle([this.state.lat, this.state.long], radius, {}).addTo(this.map);
  },
  plotFriends: function(friends){
    for(var friend=0; friend < friends.length; friend++) {
      var marker = l.marker([friends[friend].lat, friends[friend].long]).addTo(this.map);
      marker.bindPopup(friends[friend].name);
    }
    this.state.friends;
  },
  render: function() {
    return(
      <div id="map" ref="map"></div>
    );
  }
});

module.exports = map;
