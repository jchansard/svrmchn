const events = new require('../common/events/chat.events').ChatEvents();
const logger = require('../logger')("Message Emitter");

function MessageEmitter(socket, namespace) {
  this._socket = socket;
  this._namespace = namespace;
}

MessageEmitter.prototype = {
  broadcastToRoom(message /*IMessageInfo*/) {
    logger.debug(`Received message sent to room ${message.room.id}: ${message.text}`);
    this._socket.broadcast.to(message.room.id).emit(events.receiveMessage, message);
  },

  sendToSocket(socketID, message /*IMessageInfo*/) {
    logger.debug(`Sending message to ${socketID}: ${message.text}`);
    this._namespace.to(socketID).emit(events.receiveMessage, message);
  }
}

module.exports.MessageEmitter = MessageEmitter;
