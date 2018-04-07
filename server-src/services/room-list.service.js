const Observable = require('rxjs/Observable').Observable;
require("rxjs/add/observable/of");

function RoomListService() {
  this._rooms = [];
}

RoomListService.prototype = {
  get rooms() {
    return this._rooms;
  },

  roomExists(roomName) {
    return (!!this._rooms.find((room) => room.id === roomName));
  },

  createRoom(roomName) {
    let newRoom = { id: roomName };
    console.debug(roomName);
    this._rooms.push(newRoom);
    return Observable.of(newRoom);
  }
};

module.exports.RoomListService = RoomListService;
