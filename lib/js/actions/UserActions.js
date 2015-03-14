var Reflux = require('reflux');
var UserStore = Reflux.createActions([
  "setUser",
  "getUser",
  "logout"
]);

module.exports = UserStore;
