const Observable = require('rxjs/Observable').Observable;
require("rxjs/add/observable/of");

function SocketUserService() {
  this._users = {};
}

SocketUserService.prototype = {
  add(socketID, userName) {
    socketID = this._getTrueSocketID(socketID);
    this._users[socketID] = userName;
  },

  remove(socketID) {
    socketID = this._getTrueSocketID(socketID);
    delete this._users[socketID];
  },

  get(socketID) {
    socketID = this._getTrueSocketID(socketID);
    return this._users[socketID];
  },

  _getTrueSocketID(socketID) {
    return socketID.split('#')[1];
  }
};

module.exports.SocketUserService = SocketUserService;
