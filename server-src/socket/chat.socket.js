const ChatEvents = require('../common/events/chat.events').ChatEvents;

// sets up the passed socket to respond to room requests
module.exports = (io, socket) => {

  let chatEvents = new ChatEvents();

  socket.on(chatEvents.sendMessage, (messageText) => { // todo: share events);
    console.log("received message: " + messageText);
    socket.broadcast.emit(chatEvents.receiveMessage, { text: messageText, sender: socket.userID }); // todo: why socket and not io
  });
}
