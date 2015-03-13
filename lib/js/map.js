var React = require('react');
var l = require('leaflet');

var tileset = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var attribution = 'Map data <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

var map = React.createClass({
  componentDidMount: function() {
    this.getLocation();
    var node = this.refs.map.getDOMNode();
    this.map = l.map(node);
    this.map.setView([this.state.lat, this.state.long], 4);
    l.tileLayer(
      tileset,
      {
        attribution: attribution,
        minZoom: 1,
      }
    ).addTo(this.map);
  },
  getInitialState: function() {
    return {//This is Murica for now
      'lat': 38.841755,
      'long': -98.222856
    };
  },
  getLocation: function() {// getCurrentPosition uses the callback showPosition to update map coords
    if (navigator.geolocation) {// If the browser doesn't allow it, just stay on Murica for now
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      this.showPosition({latitude: 40.226262, longitude: -111.660985});
    }
  },
  showPosition: function(position) {
    this.setState({
      'lat': position.coords.latitude,
      'long': position.coords.longitude
    });
    this.map.setView([this.state.lat, this.state.long], 15);
  },
  render: function() {
    return(
      <div id="map" ref="map"></div>
    );
  }
});

module.exports = map;
