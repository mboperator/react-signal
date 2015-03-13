var React = require('react');
var FriendActions = require('./actions/FriendActions');

var FriendAdder = React.createClass({
  render() {
    return (
      <div className="adder">
        <label>Name:</label>
        <input 
          onKeyDown={this._handleSubmit} 
          ref="name" 
          type="text"/>
        <label>Phone:</label>
        <input 
          onKeyDown={this._handleSubmit} 
          ref="phone" 
          type="text"/>
        <label>Group:</label>
        <input 
          onKeyDown={this._handleSubmit} 
          ref="group" 
          type="text"/>
      </div>
    );
  },
  _handleSubmit(e) {
    if (e.keyCode === 13) {
      var name = this.refs.name.getDOMNode().value;
      var phone = this.refs.phone.getDOMNode().value;
      var group = this.refs.group.getDOMNode().value;

      FriendActions.addFriend(group, {name, phone});

      this.refs.name.getDOMNode().value = ""
      this.refs.phone.getDOMNode().value = ""
      this.refs.group.getDOMNode().value = ""
    }
  }
});

module.exports = FriendAdder;
