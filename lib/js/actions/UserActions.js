var Reflux = require('reflux');
var UserStore = Reflux.createActions([
  "addUser",
  "getUser",
  "login",
  "logout",
  "setUser",
  "updateUser",
]);

module.exports = UserStore;
