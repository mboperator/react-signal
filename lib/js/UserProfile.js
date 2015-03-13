var React = require('react');

var UserProfile = React.createClass({
  propTypes: {
    user: React.PropTypes.object
  },
  render() {
    return (
      <div className="panel">
        <h4>{this.props.user.name}</h4>
        <i>{this.props.user.phone}</i>
      </div>
    );
  }
});

module.exports = UserProfile;
