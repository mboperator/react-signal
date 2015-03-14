var React = require('react');
var Reflux = require('reflux');
var GroupAdder = require('./GroupAdder');
var FriendGroup = require('./FriendGroup');
var GroupStore = require('./stores/GroupStore');

var Friend = React.createClass({
  propTypes: {
    self: React.PropTypes.object
  },
  render() {
    return (
      <li>
        {this.props.self.name}
      </li>
    );
  }
});

var Friendlist = React.createClass({
  render() {
    return (
      <div className="panel groups">
        <ul className="list-group">
          { this.renderFriends() }
        </ul>
      </div>
    );
  },
  renderFriends() {
    if (!this.props.friends) return;
    return Object.keys(this.props.friends).map(key => {
      var friend = this.props.friends[key];
      return <Friend self={friend}/>
    });
  }
});

module.exports = Friendlist;
