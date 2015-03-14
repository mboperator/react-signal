var Reflux = require('reflux');
var UserStore = Reflux.createActions([
  "setUser",
  "getUser",
  "addUser",
  "updateUser",
  "login",
  "logout"
]);

module.exports = UserStore;
