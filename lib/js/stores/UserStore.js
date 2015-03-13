var Reflux = require('reflux');
var UserActions = require('../actions/UserActions');

var UserStore = Reflux.createStore({
  _collections : {},
  _currentUser: {},
  listenables: UserActions,
  init() {

  },
  getFriends(group) {

  },
  setFriends(group, users) {
    this._collections[group] = users;
    this.trigger("setFriends", {group, users});
  },
  getUser() {
    return this._currentUser;
  },
  setUser(user) {
    this._currentUser = user;
    this.trigger("setUser", {user});
  }
});

module.exports = UserStore;
