var Reflux = require('reflux');
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

    var key = formatPhoneForFirebase(newUser.phone);
    firebaseRef.child(key).set(newUser);
    this._currentUser = user;
  },

  logout() {
    this._currentUser = null;
    this.trigger("logout");
  }
});

module.exports = UserStore;
