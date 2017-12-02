const chatEvents = new require('../common/events/chat.events').ChatEvents();

// sets up the passed socket to respond to room requests
module.exports = (io) => {
  let chatNamespace = io.of(chatEvents.NAMESPACE);

  chatNamespace.on('connection', (socket) => {
    console.log("connected to chat");
    socket.userID = ["glasg0wn3d", "OXBOW", "online_playing", "LEFT4SCRAPS"][Math.floor(Math.random()*4)]; //todo: obviously
    socket.broadcast.emit(chatEvents.receiveMessage, { text: `${socket.userID} has joined the room`, sender: "Server" });

    socket.on(chatEvents.sendMessage, (messageText) => { // todo: share events);
      console.log("received message: " + messageText);
      socket.broadcast.emit(chatEvents.receiveMessage, { text: messageText, sender: socket.userID }); // todo: why socket and not io
    });

    socket.on('disconnect', () => {
      console.log('disconnected from chat');
      socket.broadcast.emit(chatEvents.receiveMessage, { text: `${socket.userID} has left the room`, sender: "Server" });
    });
  });
}
