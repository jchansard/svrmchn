module.exports = function(server) {
  let io = require('socket.io').listen(server);
  io.on('connection', (socket) => {
    // connect and disconnect
    console.log('user connected');
    socket.on('disconnect', () => console.log('user disconnected'));
  });

  require('./rooms.socket.js')(io);
  require('./chat.socket.js')(io);

};
