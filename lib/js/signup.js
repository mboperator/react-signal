var React = require('react');

var Signup = React.createClass({
  render() {
    return (
      <ul className="form">
        <li>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter your name..."/>
        </li>
        <li>
          <label>Phone Number:</label>
          <input
            type="phone"
            placeholder="Enter your name..."/>
        </li>
      </ul>
    );
  }
});

module.exports = Signup;
