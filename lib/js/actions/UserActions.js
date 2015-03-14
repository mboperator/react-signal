var Reflux = require('reflux');
var UserStore = Reflux.createActions([
  "addUser",
  "getUser",
  "login",
  "logout",
  "setLocation",
  "setUser",
  "updateUser",
]);

module.exports = UserStore;
