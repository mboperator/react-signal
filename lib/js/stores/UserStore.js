var Reflux = require('reflux');
var Firebase = require('firebase');
var UserActions = require('../actions/UserActions');
var GroupActions = require('../actions/GroupActions');
var GroupStore = require('../stores/GroupStore');

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
  _currentUser: {},
  listenables: UserActions,
  init() {
    setupFirebase();
    this._currentUser = {
      name: "Marcus Bernales",
      phone: "9515915766",
      groups: []
    };
    this.listenTo(GroupStore.StoreActions.addSuccess, this.onGroupAdd);
    this.listenTo(GroupStore.StoreActions.removeSuccess, this.onGroupRemove);
  },
  onGroupAdd(key) {
    this._currentUser.groups.push(key);
    
  },
  onGroupRemove(key) {
    var index = this._currentUser.groups.indexOf(key);
    if (index === -1) return;
    this._currentUser.groups.splice(index);
    this.updateUser(this._currentUser);
  },
  getUser() {
    return this._currentUser;
  },
  updateUser(user) {
    var userRef = this.firebaseRef.child(user.id);
    userRef.update(user);
  },
  setUser(user) {
    this._currentUser = user;
    this.trigger("setUser", {user});
  },
  addUser(user) {
    firebaseRef.push(user);
  },
  logout() {
    this._currentUser = null;
    this.trigger("logout");
  }
});

module.exports = UserStore;
