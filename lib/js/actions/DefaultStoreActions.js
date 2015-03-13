var Reflux = require('reflux');

function actions() {
  return Reflux.createActions([
    "addSuccess",
    "removeSuccess"
  ]);
}

module.exports = actions;
