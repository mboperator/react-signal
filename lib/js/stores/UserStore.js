var Reflux = require('reflux');
var Firebase = require('firebase');
var UserActions = require('../actions/UserActions');

var firebaseRef;

function setupFirebase() {
  firebaseRef = new Firebase("https://glaring-heat-1654.firebaseio.com/users");
  firebaseRef.on('child_added', snapshot => {
    debugger;
  });

  firebaseRef.on('child_removed', snapshot => {
    debugger;
  });
}

var UserStore = Reflux.createStore({
  _collections : {},
  _currentUser: {},
  listenables: UserActions,
  init() {
    setupFirebase();
    this._currentUser = {
      name: "Marcus Bernales",
      phone: "9515915766"
    };
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
