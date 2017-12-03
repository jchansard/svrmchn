const setUpChatNamespace = require('./chat.socket');
const roomsPlugin = require('./rooms.socket')

module.exports = function(server) {
  let io = require('socket.io').listen(server);
  io.on('connection', (socket) => {
    // connect and disconnect
    console.log(`a user connected`);
    socket.on('disconnect', () => console.log(`a user disconnected`));
  });

  // set up namespaces
  setUpChatNamespace(io, [roomsPlugin])

};
