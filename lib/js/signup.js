var React = require('react');
var UserActions = require('./actions/UserActions');

var Signup = React.createClass({
  render() {
    return (
      <ul className="form">
        <li>
          <label>Name:</label>
          <input
            ref="name"
            type="text"
            placeholder="Bob Smith"/>
        </li>
        <li>
          <label>Phone Number:</label>
          <input
            ref="phone"
            type="phone"
            placeholder="(xxx) xxx-xxxx"/>
        </li>
        <button onClick={this._handleSignup}>Sign Up</button>
        <button onClick={this._handleLogin}>Login</button>
      </ul>
    );
  },
  _handleSignup() {
    var user = {
      name: this.refs.name.getDOMNode().value,
      phone: this.refs.phone.getDOMNode().value,
    };
    UserActions.addUser(user);
  },
  _handleLogin() {
    var user = {
      name: this.refs.name.getDOMNode().value,
      phone: this.refs.phone.getDOMNode().value,
    };
    UserActions.login(user);
  }
});

module.exports = Signup;
