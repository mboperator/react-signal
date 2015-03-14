var React = require('react');
var UserActions = require('./actions/UserActions');

var UserProfile = React.createClass({
  propTypes: {
    user: React.PropTypes.object
  },
  render() {
    return (
      <div className="panel user-profile">
        <button onClick={this._handleLogout}>Logout</button>
        <img src="https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/c82.0.320.320/p320x320/10516793_10152597744297590_2596834946969806528_n.jpg?oh=5804c1bab42d3925d27281f24f1eeac4&oe=5589108E&__gda__=1434234283_c0c88de725cd096d7270bc343bd729da"/>
        <h4>{this.props.user.name}</h4>
        <i>{this.props.user.phone}</i>
      </div>
    );
  },
  _handleLogout() {
    UserActions.logout();
  }
});

module.exports = UserProfile;
