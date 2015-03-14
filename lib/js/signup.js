var React = require('react');

var Signup = React.createClass({
  render() {
    return (
      <ul className="form">
        <li>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Bob Smith"/>
        </li>
        <li>
          <label>Phone Number:</label>
          <input
            type="phone"
            placeholder="(xxx) xxx-xxxx"/>
        </li>
        <li>
          <label>Password:</label>
          <input
            type="text"
            placeholder="password"/>
        </li>
        <button onClick={this._handleSignup}>Sign Up</button>
        <button onClick={this._handleLogin}>Login</button>
      </ul>
    );
  }
});

module.exports = Signup;
