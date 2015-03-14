var React = require('react');
var UserActions = require('./actions/UserActions');
var defaultThumbnail = "http://www.komplekscreative.com/wordpress/wp-content/plugins/all-in-one-seo-pack-pro/images/default-user-image.png";
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
        <img src={this.props.user.thumbnail || defaultThumbnail}/>
        <h4>{this.props.user.name}</h4>
        <i>{this.props.user.phone}</i>
        <input 
          type="text" 
          ref="status" 
          placeholder="Down to..." 
          onKeyDown={this._handleStatusChange}/>
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
