module.exports = function(io) {
  io.on('connection', (socket) => {
    // connect and disconnect
    console.log('user connected');
    socket.on('disconnect', () => console.log('user disconnected'));
    socket.userID = ["glasg0wn3d", "OXBOW", "online_playing", "LEFT4SCRAPS"][Math.floor(Math.random()*4)]; //todo: obviously

    require('./rooms.socket.js')(io, socket);
    require('./chat.socket.js')(io, socket);

  });
  return io;
};
