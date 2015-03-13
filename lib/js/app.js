var React = require('react');
var Map = require('./map');
var Reflux = require('reflux');
var Sidebar = require('./Sidebar');
var UserStore = require('./stores/UserStore');

var App = React.createClass({
  mixins: [Reflux.ListenerMixin],
  componentWillMount() {
    this.listenTo(UserStore, this.onStoreChange);
  },
  getInitialState() {
    return {
      user: UserStore.getUser(),
      friends: {}
    };
  },
  onStoreChange(type, payload) {
    var newState = {};
    switch(type) {
      case "setUser":
        newState.currentUser = payload.user;
        break;
      case "setFriends":
        newState.friends = payload;
        break;
      default:
        newState = undefined;
        break;
    }
    newState && this.setState(newState);
  },
  render() {
    return (
      <div className="container-fluid">
        <Sidebar {...this.state}/>
        <div className="map">
          <Map/>
        </div>
      </div>
    );
  }
});

React.render(<App/>, document.getElementById('app'));
