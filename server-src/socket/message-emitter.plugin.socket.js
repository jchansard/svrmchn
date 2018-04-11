const events = new require('../common/events/chat.events').ChatEvents();
const availableServices = require('../services/service-loader').availableServices;
const MessageEmitter = require('./message-emitter').MessageEmitter;
const logger = new require('../logger')("MessageEmitter Plugin");

// sets up the passed socket to respond to room requests
module.exports = (app, namespace, socket) => {
  let messageEmitter = new MessageEmitter(socket, namespace);
  let roomService = app.get('services').load(availableServices.roomList);
  //let socketUsers = app.get('services').load(availableServices.socketUsers);

  socket.on(events.sendMessage, (message) => { // todo: share events);
    message.room.id = (message.room.isWhisper) ? `w/${message.room.id}` : `p/${message.room.id}`;  // TODO: this should be handled somewhere else
    if (!roomService.roomExists(message.room)) {
      logger.debug(`Room ${message.room.id} not found`);
      messageEmitter.sendToSocket(socket.id, {
        text: `Room ${message.room.id} not found`,
        room: "System",
        sender: "Error"
      })
    }
    else {
      messageEmitter.broadcastToRoom(message);
    }
  });
}
