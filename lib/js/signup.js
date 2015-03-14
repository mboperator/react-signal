var React = require('react');
var UserActions = require('./actions/UserActions');
var Signin = require('./Signin');

var Signup = React.createClass({
  getInitialState() {
    return {
      login: false
    }
  },
  render() {
    return (
      <div className="panel login">
        <button onClick={this._enableLogin}>Login</button>
        <button onClick={this._enableSignup}>Sign Up</button>
        {this.renderSignup()}
        {this.renderLogin()}
      </div>
    );
  },
  _enableLogin() {
    this.setState({login: true});
  },
  _enableSignup() {
    this.setState({login: false});
  },
  renderLogin() {
    if (!this.state.login) return null;
    return(
      <Signin/>
      )
  },
  renderSignup() {
    if (this.state.login) return null;
    return(
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
        <li>
          <label>Thumbnail:</label>
          <input
            ref="thumbnail"
            type="text"
            placeholder="link/to/jpg"/>
        </li>

        <button onClick={this._handleSignup}>Sign Up</button>
      </ul>
    );
  },
  _handleSignup() {
    var user = {
      name: this.refs.name.getDOMNode().value,
      phone: this.refs.phone.getDOMNode().value,
      thumbnail: this.refs.thumbnail.getDOMNode().value,
    };
    UserActions.addUser(user);
  }
});

module.exports = Signup;
