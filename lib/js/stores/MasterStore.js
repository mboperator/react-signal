var _ = require('underscore');

var Reflux = require('reflux');
var GroupStore = require('./GroupStore');
var UserStore = require('./UserStore');
var FriendStore = require('./FriendStore');

var GroupActions = require('./actions/GroupActions');
var UserActions = require('./actions/UserActions');
var FriendActions = require('./actions/FriendActions');


var MasterStore = Reflux.createStore({
  _groups: {},
  _friends: {},
  _user: {},
  init() {
    this.listenTo(GroupStore, onGroupChange);
    this.listenTo(UserStore, onUserChange);
    this.listenTo(FriendStore, onFriendChange);
  },
  onGroupChange(type, payload) {
    this._groups = payload; 
    this.trigger('change');
  },
  onUserChange(type, payload) {
    this._user = UserStore.getUser;
    this.trigger('change');
  },
  onFriendChange(type, payload) {
    this._friends = payload;
    this.trigger('change');
  },
  addGroup(group) {
    var namesToKeys = {};
    var names = Object.keys(this._groups).map(key => {
      var group = this._groups[key];
      namesToKeys[group.name] = group.id;
      return group.name;
    });

    if (names.indexOf(group.name) !== -1) {
      return GroupStore.StoreActions.addSuccess(namesToKeys[group.name], group);
    } else {
      GroupActions.addGroup(group);
    }
  },
  getUserGroups() {
    var userGroups = this._user.groups;
    var groupIds = Object.keys(this._groups);
    var intersect = _.intersection(userGroups, groupIds);
    return GroupStore.getGroups(intersect);
  }
});

module.exports = MasterStore;
