var Reflux = require('reflux');
var Firebase = require('firebase');
var GroupActions = require('../actions/GroupActions');
var DefaultStoreActions = require('../actions/DefaultStoreActions');
var _ = require('underscore');
var firebaseRef;

function updateWithSnapshot(snapshot) {
  var val = snapshot.val();
  var group = {id: snapshot.key() };
  group = _.extend(group, val);
  GroupStore.setGroup(snapshot.key(), group);
  GroupStore.StoreActions.addSuccess(snapshot.key());
}

function setupFirebase() {
  firebaseRef = new Firebase("http://glaring-heat-1654.firebaseio.com/groups");
  firebaseRef.on('child_added', updateWithSnapshot);
  firebaseRef.on('child_changed', updateWithSnapshot);  
  firebaseRef.on('child_removed', snapshot => {
    GroupStore.destroyGroup(snapshot.key());
  });
}

var GroupStore = Reflux.createStore({
  _collections : {},
  listenables: GroupActions,
  StoreActions: DefaultStoreActions(),
  init() {
    setupFirebase();
  },
  getGroups(userGroups) {
    var groups = [];
    userGroups.forEach(groupId => {
      groups.concat(this._collections[groupId] || []);
    });
    return groups;
  },
  setGroup(key, group) {
    this._collections[key] = group;
    this.trigger("setGroups", this._collections);
  },
  destroyGroup(key) {
    delete this._collections[key];
    this.trigger("setGroups", this._collections);
  },
  addGroup(group) {
    firebaseRef.push(group);
  },
  updateGroup(group) {
    var groupRef = firebaseRef.child(group.id);
    groupRef.update(group);
  },
  removeGroup(group) {
    firebaseRef.child(group.id).remove();
  }
});

module.exports = GroupStore;
