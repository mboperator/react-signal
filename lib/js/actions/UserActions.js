var Reflux = require('reflux');
var UserStore = Reflux.createActions([
  "setUser",
  "getUser"
]);

module.exports = UserStore;
