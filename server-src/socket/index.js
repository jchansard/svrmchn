const setUpChatNamespace = require('./chat.socket');
const roomsPlugin = require('./rooms.socket')

module.exports = function(app, server) {
  let io = require('socket.io').listen(server);
  app.set('io', io);
  io.on('connection', (socket) => {
    // connect and disconnect
    console.log(`a user connected`);
    socket.on('disconnect', () => console.log(`a user disconnected`));
  });

  // set up namespaces
  setUpChatNamespace(app, [roomsPlugin])

};
