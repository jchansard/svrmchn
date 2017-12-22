const events = new require('../common/events/chat.events').ChatEvents();
const MessageEmitter = require('./message-emitter').MessageEmitter;

// sets up the passed socket to respond to room requests
module.exports = (app, namespace, socket) => {
  let messageEmitter = new MessageEmitter(socket);

  socket.on(events.sendMessage, (message) => { // todo: share events);
    messageEmitter.broadcastToRoom(message);
  });
}
