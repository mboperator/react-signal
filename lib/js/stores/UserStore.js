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

  firebaseRef.on('child_removed', snapshot => {
    
  });
}

var UserStore = Reflux.createStore({
  _collection: {},
  _currentUser: null,
  listenables: UserActions,
  init() {
    setupFirebase();
  },
  getUser() {
    return this._currentUser;
  },
  updateUser(hash) {
    var userRef = this.firebaseRef.child(user.id);
    var user = _.extend(this._currentUser, hash);
    userRef.update(user);
  },
  setUsers(key, user) {
    this._collection[key] = user;
  },
  setUser(user) {
    this._currentUser = user;
    this.trigger("setUser", {user});
  },
  addUser(user) {
    var key = formatPhoneForFirebase(user.phone);
    firebaseRef.child(key).set(user);
    this.setUser(user);
  },
  login(toLogin) {
    var filtered = _(this._collection).filter(user => {
      return formatPhoneForFirebase(user.phone) === formatPhoneForFirebase(toLogin.phone);
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
