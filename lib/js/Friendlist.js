var React = require('react');
var Reflux = require('reflux');
var GroupAdder = require('./GroupAdder');
var FriendGroup = require('./FriendGroup');
var GroupStore = require('./stores/GroupStore');
var moment = require('moment');

var Friend = React.createClass({
  propTypes: {
    self: React.PropTypes.object
  },
  render() {
    var time = this.props.self.basedTime;
    if (time) time = moment(time).fromNow();
    return (
      <li>
        <h4>{this.props.self.name}</h4>
        { this.renderStatus() }
      </li>
    );
  },
  renderStatus() {
    var status = this.props.self.status;
    if(!status) return;
    var time = this.renderTime(this.props.self.basedTime, this.props.self.endTime);
    return(
      `${status} for the next ${time}`
      );
  },
  renderTime(start, end) {
    if (!start || !end) return;
    var endTime = moment(start).add(end, 'm');
    var startTime = moment(start);
    var time = endTime.diff(startTime, 'minutes');

    if (time > 60) {
      time = time/60;
      time.toFixed(0);
      time = (time > 1) ? `${time} hours` : `${time} hour`;
    } else {
      time = `${time} minutes`;
    }
    return(time);
  }
});

var Friendlist = React.createClass({
  render() {
    return (
      <div className="panel groups">
        <ul className="list-group">
          { this.renderFriends() }
        </ul>
      </div>
    );
  },
  renderFriends() {
    if (!this.props.friends) return;
    return Object.keys(this.props.friends).map(key => {
      var friend = this.props.friends[key];
      return <Friend self={friend}/>
    });
  }
});

module.exports = Friendlist;
