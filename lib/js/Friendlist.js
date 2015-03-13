var React = require('react');
var Reflux = require('reflux');
var FriendAdder = require('./FriendAdder');
var FriendGroup = require('./FriendGroup');
var FriendStore = require('./stores/FriendStore');

var Friendlist = React.createClass({
  mixins: [ Reflux.ListenerMixin ],
  componentWillMount () {
    this.listenTo(FriendStore, this.onStoreChange);
  },
  getInitialState() {
    return {
        friends: FriendStore.getFriends()
    };
  },
  onStoreChange(type, payload) {
    this.setState({
      friends: payload
    });
  },
  render() {
    return (
      <div className="panel">
        <FriendAdder/>
        <ul className="friendlist">
          { this.renderGroups() }
        </ul>
      </div>
    );
  },
  renderGroups() {
    var groups = Object.keys(this.state.friends);
    return groups.map((group, index) => {
      return( 
        <FriendGroup 
          key={index} 
          group={group} 
          friends={this.state.friends[group]}/>
      );
    });
  }
});

module.exports = Friendlist;
