const Observable = require('rxjs/Observable').Observable;
require("rxjs/add/observable/of");
const logger = require('../logger')("Room Service");

function RoomListService() {
  this._rooms = [];
}

RoomListService.prototype = {
  get rooms() {
    return this._rooms;
  },

  roomExists(room) {
    let found = (!!this._rooms.find((currRoom) => currRoom.id === room.id));
    if (!found) {
      logger.debug(`Room not found: ${room.id}`);
      return false;
    }
    else {
      return true;
    }
  },

  createRoom(room) {
    logger.debug(`Creating room: ${room.id}`)
    this._rooms.push(room);
    return Observable.of(room);
  }
};

module.exports.RoomListService = RoomListService;
