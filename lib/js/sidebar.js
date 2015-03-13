var React = require('react');
var Signup = require('./Signup');
var UserProfile = require('./UserProfile');
var Friendlist = require('./Friendlist');

var Sidebar = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
    friends: React.PropTypes.object
  },
  render() {
    return (
      <div className="sidebar">
        <UserProfile user={this.props.user}/>
        <Friendlist friends={this.props.friends}/>
      </div>
    );
  }
});

module.exports = Sidebar;
