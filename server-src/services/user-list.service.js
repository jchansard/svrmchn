const logger = require('../logger')("User-Service");
const Observable = require('rxjs/Observable').Observable;
require("rxjs/add/observable/of");


function UserListService() {
  this._sockets = new Map();
  this._users = new Map();
  this._userCounters = new Map();
}

UserListService.prototype = {

  connect(socketID, user) {
    if (!user.userName) {
      logger.error("userList: invalid user passed to connectSocket");
      return;
    }
    this._addSocket(socketID, user);
    if (!this._userIsConnected(user)) {
      this._addUser(user);
    }
    else {
      this._incrementUserCounter(user);
    }
  },

  disconnect(socketID) {
    let userName = this._getUserNameFromSocket(socketID);
    this_deleteSocket(socketID);
    this._decrementUserCounter(user);
    if (this._userCounters.get(user) === 0) {
      this._removeUser(user);
    }

  },

  getUserNameFromSocket(socketID) {
    socketID = this._getTrueSocketID(socketID);
    return this._sockets.get(socketID);
  },

  getUserFromSocket(socketID) {
    socketID = this._getTrueSocketID(socketID);
    let userName = this._sockets.get(socketID);
    return this._users.get(userName);
  },



  _getTrueSocketID(socketID) {
    return socketID.split('#')[1];
  },

  _userIsConnected(user) {
    return this._users.has(user.userName);
  },

  _addUser(user) {
    this._users.set(user.userName, user);
    this._incrementUserCounter(user);
  },

  _removeUser(user) {
    this._users.delete(user.userName);
  },

  _addSocket(socketID, user) {
    socketID = this._getTrueSocketID(socketID);
    this._sockets.set(socketID, user.userName);
  },

  _deleteSocket(socketID) {
    socketID = this._getTrueSocketID(socketID);
    this._sockets.delete(socketID);
  },

  _incrementUserCounter(user) {
    this._userCounters.set(user.userName, this._userCounters.get(user.userName) + 1);
  },

  _decrementUserCounter(user) {
    this._userCounters.set(user.userName, this._userCounters.get(user.userName) -1);
  }

};

module.exports.UserListService = UserListService;

// add(socketID, userName) {
//   socketID = this._getTrueSocketID(socketID);
//   this._users[socketID] = userName;
// },
//
// remove(socketID) {
//   socketID = this._getTrueSocketID(socketID);
//   delete this._users[socketID];
// },
//
// get(socketID) {
//   socketID = this._getTrueSocketID(socketID);
//   return this._users[socketID];
// },
