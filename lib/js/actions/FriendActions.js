var Reflux = require('reflux');
var FriendActions = Reflux.createActions([
  "setFriends",
  "getFriends",
  "addFriend",
  "removeFriend"
]);

module.exports = FriendActions;
