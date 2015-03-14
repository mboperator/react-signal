var React = require('react');
var l = require('leaflet');
var UserActions = require('./actions/UserActions');

var tileset = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var attribution = 'Map data <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
l.Icon.Default.imagePath = './images';

var map = React.createClass({
  componentDidMount: function() {
    this.getCurrentLocation();
    var node = this.refs.map.getDOMNode();
    this.map = l.map(node);
    l.tileLayer(tileset, { attribution: attribution, minZoom: 1, }).addTo(this.map);
  },
  getInitialState: function() {
    return {//This is Murica for now
      'lat': 38.841755,
      'long': -98.222856,
      'markers': new l.FeatureGroup()
    };
  },
  getLocation: function() {
    return {
      "lat": this.state.lat,
      "long": this.state.long
    };
  },
  componentWillReceiveProps: function(nextProps) {
    if(nextProps.user !== null) {
      this.plotFriends(nextProps.friends);
    } else {
      this.state.markers.clearLayers();
      //this.map.setView([this.state.lat, this.state.long], 9)
    }
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
    //this.map.fitBounds(this.state.markers.getBounds());
  },
  plotFriends: function(friends){
    for(var key in friends) {
      var marker = l.marker([friends[key].lat, friends[key].long]);
      //this.map.setView([this.state.lat, this.state.long], 13);
      marker.bindPopup(friends[key].name + "<br />" + friends[key].status, {showOnMouseOver: true});
      this.state.markers.addLayer(marker);
      this.map.addLayer(this.state.markers);
    }
     this.map.fitBounds(this.state.markers.getBounds());
  },
  render: function() {
    return(
      <div id="map" ref="map"></div>
    );
  }
});

module.exports = map;
