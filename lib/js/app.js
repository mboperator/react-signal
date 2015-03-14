var React = require('react');
var Map = require('./map');
var Reflux = require('reflux');
var Sidebar = require('./Sidebar');
var UserStore = require('./stores/UserStore');

var App = React.createClass({
  mixins: [Reflux.ListenerMixin],
  componentWillMount() {
    this.listenTo(UserStore, this.onUserChange);
  },
  getInitialState() {
    return {
      user: UserStore.getUser(),
      friends: UserStore.getUsers()
    };
  },
  onUserChange(type, payload) {
    this.setState({
      user: UserStore.getUser()
    });
  },
  render() {
    return (
      <div className="container-fluid">
        <Sidebar {...this.state}/>
        <Map friends={this.state.friends}/>
      </div>
    );
  }
});

React.render(<App/>, document.getElementById('app'));
