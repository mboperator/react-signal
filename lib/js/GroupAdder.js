var React = require('react');
var GroupActions = require('./actions/GroupActions');

var GroupAdder = React.createClass({
  render() {
    return (
      <div className="adder">
        <label>Group Name:</label>
        <input 
          onKeyDown={this._handleSubmit} 
          ref="group" 
          type="text"/>
      </div>
    );
  },
  _handleSubmit(e) {
    if (e.keyCode === 13) {
      var group = { name: this.refs.group.getDOMNode().value };
      GroupActions.addGroup(group);
      this.refs.group.getDOMNode().value = "";
    }
  }
});

module.exports = GroupAdder;
