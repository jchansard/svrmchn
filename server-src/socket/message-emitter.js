const events = new require('../common/events/chat.events').ChatEvents();
const logger = require('../logger')("Message Emitter");

function MessageEmitter(socket, namespace) {
  this._socket = socket;
  this._namespace = namespace;
}

MessageEmitter.prototype = {
  broadcastToRoom(message /*IMessageInfo*/) {
    logger.debug(`received message sent to room ${message.room}: ${message.text}`);
    this._socket.broadcast.to(message.room).emit(events.receiveMessage, message);
  },

  sendToSocket(socketID, message /*IMessageInfo*/) {
    logger.debug(`sending message to ${socketID}: ${message.text}`);
    this._namespace.to(socketID).emit(events.receiveMessage, message);
  }
}

module.exports.MessageEmitter = MessageEmitter;
