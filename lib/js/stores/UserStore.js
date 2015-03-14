var Reflux = require('reflux');
var _ = require('underscore');
var Firebase = require('firebase');
var UserActions = require('../actions/UserActions');
var GroupActions = require('../actions/GroupActions');
var GroupStore = require('../stores/GroupStore');

var firebaseRef;

var formatPhoneForFirebase =  function(email){
  var key = email.replace(/\-/, '');
  return key;
};

function setupFirebase() {
  firebaseRef = new Firebase("https://glaring-heat-1654.firebaseio.com/users");
  firebaseRef.on('child_added', snapshot => {
    UserStore.setUsers(snapshot.key(), snapshot.val());
  });
  firebaseRef.on('child_changed', snapshot => {
    UserStore.setUsers(snapshot.key(), snapshot.val());
  });
  firebaseRef.on('child_removed', snapshot => {

  });
}

var UserStore = Reflux.createStore({
  _collection: {},
  _currentUser: null,
  _location: {},
  listenables: UserActions,
  init() {
    setupFirebase();
  },
  getUsers() {
    return this._collection;
  },
  getUser() {
    return this._currentUser;
  },
  updateUser(user) {
    var userRef = firebaseRef.child(user.phone);
    userRef.update(user);
  },
  setUsers(key, user) {
    this._collection[key] = user;
    this.trigger('setUsers');
  },
  setUser(user) {
    if(!user.lat){
      user = _.extend(user, this._location);
      this.updateUser(user);
    }
    this._currentUser = user;
    this.trigger("setUser", {user});
  },
  setLocation(loc){
    this._location = loc;
  },
  addUser(user) {
    user.phone = formatPhoneForFirebase(user.phone);
    var key = user.phone;

    firebaseRef.child(key).set(user);
    this.setUser(user);
  },
  login(toLogin) {
    var filtered = _(this._collection).filter(user => {
      return user.phone === toLogin.phone;
    });
    if (filtered.length === 0) return;
    else this.setUser(filtered[0]);
  },
  logout() {
    this._currentUser = null;
    this.trigger("logout");
  }
});

module.exports = UserStore;
