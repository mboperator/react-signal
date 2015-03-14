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
    var Component = (this.props.user) ? UserProfile : Signup;
    return (
      <div className="sidebar">
        <Component user={this.props.user}/>
        { this.renderFriends() }
      </div>
    );
  },
  renderFriends() {
    return (this.props.user) ? <Friendlist friends={this.props.friends}/> : null;
  }
});

module.exports = Sidebar;
