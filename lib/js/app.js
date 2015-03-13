var React = require('react');
var Sidebar = require('./sidebar');

var App = React.createClass({
  render() {
    return (
      <div className="container-fluid">
        <Sidebar />
        <div className="map">
          <h2>Map</h2>
        </div>
      </div>
    );
  }
});

React.render(<App/>, document.getElementById('app'));
