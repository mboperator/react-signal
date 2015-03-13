var React = require('react');
var mapbox = require('mapbox');

var key = "pk.eyJ1IjoiYXJldmlyIiwiYSI6IkRJX0ZBTW8ifQ.e9y6DpeQdPfQalNdcAKxLw"

var map = React.createClass({
	componentDidMount: function() {
		var node = this.refs.map.getDOMNode();
		this.map = mapbox.map(node, 'arevir.lf0clajp');
	},
	render: function() {
		L.mapbox.accessToken = key;
		return(
				<div ref="map"></div>
		)
	}
});

module.exports = map;