var React = require('react');
var Signup = require('./Signup');
var UserProfile = require('./UserProfile');
var Friendlist = require('./Friendlist');

var Sidebar = React.createClass({
  render() {
    return (
      <div className="sidebar">
        <UserProfile/>
        <Friendlist/>
      </div>
    );
  }
});

module.exports = Sidebar;