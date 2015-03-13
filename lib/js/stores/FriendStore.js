var Reflux = require('reflux');
var Firebase = require('firebase');
var FriendActions = require('../actions/FriendActions');
var _ = require('underscore');
var firebaseRef;

var FriendStore = Reflux.createStore({
  _collections : {},
  _subscribedGroups: [],
  listenables: FriendActions,
  init() {
    this._setupFirebase();
  },
  _setupFirebase() {
    firebaseRef = new Firebase("http://glaring-heat-1654.firebaseio.com/friends");
    firebaseRef.on('child_added', this._updateWithSnapshot);
    firebaseRef.on('child_changed', this._updateWithSnapshot);  
    firebaseRef.on('child_removed', snapshot => {
      this.removeGroup(snapshot.key());
    });
  },
  _updateWithSnapshot(snapshot) {
    // Check if group is registered
    var groups = Object.keys(this._collections);
    if (groups.indexOf(snapshot.key()) === -1) return;

    var friends = [];
    var val = snapshot.val();
    Object.keys(val).map(key => {
      var friend = val[key];
      friend.id = key;
      friends.push(friend);
    });
    this.setFriends(snapshot.key(), friends);
  },
  getFriends() {
    return this._collections;
  },
  setFriends(group, users) {
    this._collections[group] = users;
    this.trigger("setFriends", this._collections);
  },
  setGroups(groups) {
    this._collections = {};
    groups.forEach(group => {
      this._collections[group] = [];
    });
    this.trigger("setGroups", this_collections);
  },
  removeGroup(group) {
    delete this._collections[group];
    this.trigger("removeGroup", this._collections);
  },
  addFriend(group, friend) {
    if (!group) group = "uncategorized";
    var groupRef = firebaseRef.child(group + "/friends");
    groupRef.push(friend);
  },
  removeFriend(group, friendKey) {
    var groupRef = firebaseRef.child(group);
    groupRef.child(friendKey).remove();
  }
});

module.exports = FriendStore;
