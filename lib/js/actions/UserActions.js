var Reflux = require('reflux');
var UserStore = Reflux.createActions([
  "addUser",
  "getUser",
  "login",
  "logout",
  "setUser",
  "updateUsers",
]);

module.exports = UserStore;
