var React = require('react');

var Friendlist = React.createClass({
  render() {
    return (
      <div className="panel">
        <ul className="friendlist">
          <li>
            Christian Rivera
          </li>
          <li>
            Remy Younes
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = Friendlist;
