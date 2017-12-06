const Observable = require('rxjs/Observable').Observable;
require("rxjs/add/observable/of");

function RoomListService() {
  this._rooms = [];
}

RoomListService.prototype = {
  get rooms() {
    return this._rooms;
  },

  createRoom(roomName) {
    let newRoom = { id: roomName };
    this._rooms.push(newRoom);
    return Observable.of(newRoom);
  }
};

module.exports.RoomListService = RoomListService;
