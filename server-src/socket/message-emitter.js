const events = new require('../common/events/chat.events').ChatEvents();

function MessageEmitter(socket) {
  this._socket = socket;
}

MessageEmitter.prototype = {
  broadcastToRoom(message /*MessageInfo*/) {
    console.log(`received message sent to room ${message.room}: ${message.text}`);
    this._socket.broadcast.to(message.room).emit(events.receiveMessage, message);
  }
}

module.exports.MessageEmitter = MessageEmitter;
