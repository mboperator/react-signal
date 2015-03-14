var React = require('react');
var UserActions = require('./actions/UserActions');

var Signin = React.createClass({
  render() {
    return (
      <ul className="form">
        <li>
          <label>Phone Number:</label>
          <input
            ref="phone"
            type="phone"
            placeholder="(xxx) xxx-xxxx"/>
        </li>
        <button onClick={this._handleLogin}>Login</button>
      </ul>
    );
  },
  _handleLogin() {
    var user = {
      phone: this.refs.phone.getDOMNode().value,
    };
    UserActions.login(user);
  }
});

module.exports = Signin;
