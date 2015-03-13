var Reflux = require('reflux');
var GroupActions = Reflux.createActions([
  "setGroups",
  "addGroup",
  "removeGroup"
]);

module.exports = GroupActions;
