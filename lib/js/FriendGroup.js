var React = require('react');
var FriendActions = require('./actions/FriendActions');

var Friend = React.createClass({
  propTypes: {
    self: React.PropTypes.object
  },
  render() {
    return (
      <li>
        {this.props.self.name}
        <button onClick={this._handleDelete}>X</button>
      </li>
    );
  },
  _handleDelete() {
    FriendActions.removeFriend(this.props.group, this.props.self.id);
  }
});

var FriendGroup = React.createClass({
  propTypes: {
    group: React.PropTypes.string,
    friends: React.PropTypes.array
  },
  render() {
    return (
      <ul className="group">
        <h5>{this.props.group}</h5>
        { this._renderFriends() }
      </ul>
    );
  },
  _renderFriends() {
    return this.props.friends.map(friend=>{
      return(
        <Friend self={friend} group={this.props.group}/>
      );
    });
  }
});

module.exports = FriendGroup;
