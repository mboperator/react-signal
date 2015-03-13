var Reflux = require('reflux');
var Firebase = require('firebase');
var FriendActions = require('../actions/FriendActions');
var _ = require('underscore');
var firebaseRef;

function updateWithSnapshot(snapshot) {
  var val = snapshot.val();
  var friends = [];
  Object.keys(val).map(key => {
    friends.push(val[key]);
  });
  UserStore.setFriends(snapshot.key(), friends);
}

function setupFirebase() {
  firebaseRef = new Firebase("http://glaring-heat-1654.firebaseio.com/friends");
  firebaseRef.on('child_added', updateWithSnapshot);
  firebaseRef.on('child_changed', updateWithSnapshot);  
  firebaseRef.on('child_removed', updateWithSnapshot);
}

var UserStore = Reflux.createStore({
  _collections : {},
  listenables: FriendActions,
  init() {
    setupFirebase();
  },
  getFriends() {
    return this._collections;
  },
  getAllFriends() {

  },
  setFriends(group, users) {
    this._collections[group] = users;
    this.trigger("setFriends", this._collections);
  },
  addFriend(group, friend) {
    if (!group) group = "uncategorized";
    var groupRef = firebaseRef.child(group);
    groupRef.push(friend);
  },
  removeFriend(group, friend) {
    var groupRef = firebaseRef.child(group);
    groupRef.child(friend.id).remove();
  }
});

module.exports = UserStore;
