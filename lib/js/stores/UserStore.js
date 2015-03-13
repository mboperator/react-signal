var Reflux = require('reflux');
var UserActions = require('../actions/UserActions');

var UserStore = Reflux.createStore({
  _collections : {},
  _currentUser: {},
  listenables: UserActions,
  init() {
    this._currentUser = {
      name: "Marcus Bernales",
      phone: "9515915766"
    };
  },
  getFriends(group) {

  },
  setFriends(group, users) {
    this._collections[group] = users;
    this.trigger("setFriends", this._collections);
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
