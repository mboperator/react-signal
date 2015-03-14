var Reflux = require('reflux');
var UserStore = Reflux.createActions([
  "setUser",
  "getUser",
  "addUser",
  "login",
  "logout"
]);

module.exports = UserStore;
