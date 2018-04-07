const events = new require('../common/events/chat.events').ChatEvents();
const availableServices = require('../services/service-loader').availableServices;
const MessageEmitter = require('./message-emitter').MessageEmitter;

// sets up the passed socket to respond to room requests
module.exports = (app, namespace, socket) => {
  let messageEmitter = new MessageEmitter(socket, namespace);
  let roomService = app.get('services').load(availableServices.roomList);
  //let socketUsers = app.get('services').load(availableServices.socketUsers);

  socket.on(events.sendMessage, (message) => { // todo: share events);
    if (!roomService.roomExists(message.room)) {
      messageEmitter.sendToSocket(socket.id, {
        text: `room ${message.room} not found`,
        room: "System",
        sender: "Error"
      })
    }
    else {
      messageEmitter.broadcastToRoom(message);
    }
  });
}
