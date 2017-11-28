module.exports = function(io) {
  io.on('connection', (socket) => {
    // connect and disconnect
    console.log('user connected');
    socket.on('disconnect', () => console.log('user disconnected'));

    require('./rooms.socket.js')(io, socket);
    // set input
    //socket.userID = userID;
    // handle events
    //require('./gamedata.socket.js')(socket, db);

  });
  return io;
};
