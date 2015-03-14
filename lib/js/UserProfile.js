var React = require('react');
var UserActions = require('./actions/UserActions');

var UserProfile = React.createClass({
  propTypes: {
    user: React.PropTypes.object
  },
  getInitialState() {
    return {
      time: null
    }
  },
  render() {
    return (
      <div className="panel user-profile">
        <button onClick={this._handleLogout}>Logout</button>
        <img src="https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/c82.0.320.320/p320x320/10516793_10152597744297590_2596834946969806528_n.jpg?oh=5804c1bab42d3925d27281f24f1eeac4&oe=5589108E&__gda__=1434234283_c0c88de725cd096d7270bc343bd729da"/>
        <h4>{this.props.user.name}</h4>
        <i>{this.props.user.phone}</i>
        <input type="text" ref="status" onKeyDown={this._handleStatusChange}/>
        <input 
          type="range" 
          ref="time"
          step={30}
          min={0}
          max={300}
          value={this.state.selectedTime}
          onChange={this._handleTimeChange}/>
        <label>{ this.renderTime() }</label>
      </div>
    );
  },
  _handleLogout() {
    UserActions.logout();
  },
  _handleStatusChange(e) {
    if (e.keyCode === 13) {
      var user = this.props.user;
      user.status = this.refs.status.getDOMNode().value;
      user.basedTime = new Date();
      user.endTime = this.state.selectedTime;
      UserActions.updateUser(user);
      this.setState({selectedTime: null});
    }
  },
  _handleTimeChange(e) {
    this.setState({
      selectedTime: e.target.value
    });
  },
  renderTime() {
    if (!this.state.selectedTime) return;
    var time = this.state.selectedTime;
    if (time > 60) {
      time = time/60;
      time.toFixed(0);
      time = (time > 1) ? `for ${time} hours` : `for ${time} hour`;
    } else {
      time = `for ${time} minutes`;
    }
    return(time);
  }
});

module.exports = UserProfile;
