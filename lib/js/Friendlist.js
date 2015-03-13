var React = require('react');
var Reflux = require('reflux');
var GroupAdder = require('./GroupAdder');
var FriendGroup = require('./FriendGroup');
var GroupStore = require('./stores/GroupStore');

var Friendlist = React.createClass({
  mixins: [ Reflux.ListenerMixin ],
  componentWillMount () {
    this.listenTo(GroupStore, this.onStoreChange);
  },
  getInitialState() {
    return {
        groups: GroupStore.getGroups()
    };
  },
  onStoreChange(type, payload) {
    this.setState({
      groups: payload
    });
  },
  render() {
    return (
      <div className="panel">
        <GroupAdder />
        <ul className="friendlist">
          { this.renderGroups() }
        </ul>
      </div>
    );
  },
  renderGroups() {
    if (!this.state.groups) return;
    var groups = this.state.groups;
    var keys = Object.keys(groups);
    return keys.map((key, index) => {
      return( 
        <FriendGroup 
          key={index} 
          self={groups[key]}/>
      );
    });
  }
});

module.exports = Friendlist;
