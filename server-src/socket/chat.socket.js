const events = new require('../common/events/chat.events').ChatEvents();

// sets up the passed socket to respond to room requests
module.exports = (io, plugins) => {
  let namespace = io.of(events.NAMESPACE);

  namespace.on('connection', (socket) => {
    let userID = ["glasg0wn3d", "OXBOW", "online_playing", "LEFT4SCRAPS"][Math.floor(Math.random()*4)]; //todo: obviously
    console.log(`${userID} connected to chat`);
    socket.broadcast.emit(events.receiveMessage, { text: `${userID} has joined the room`, sender: "Server" });

    socket.on(events.sendMessage, (message) => { // todo: share events);
      console.log(`received message sent to room ${message.room}: ${message.text}`);
      socket.broadcast.to(message.room).emit(events.receiveMessage, { text: message.text, sender: userID }); // todo: why socket and not io
    });

    socket.on('disconnect', () => {
      console.log('disconnected from chat');
      socket.broadcast.emit(events.receiveMessage, { text: `${userID} has left the room`, sender: "Server" });
    });

    plugins.forEach((pluginFunction) => {
      pluginFunction(namespace, socket, userID);
    })
  });

}
