var Reflux = require('reflux');
var FriendActions = Reflux.createActions([
  "setFriends",
  "addFriend",
  "removeFriend",
  "setGroups",
  "removeGroup"
]);

module.exports = FriendActions;
