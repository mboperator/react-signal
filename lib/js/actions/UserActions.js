var Reflux = require('reflux');
var UserStore = Reflux.createActions([
  "setFriends",
  "getFriends",
  "setUser",
  "getUser"
]);

module.exports = UserStore;
