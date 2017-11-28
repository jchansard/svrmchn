module.exports = function(io, userID, db) {
  io.on('connection', (socket) => {
    // connect and disconnect
    console.log('user connected');
    socket.on('disconnect', () => console.log('user disconnected'));

    // set input
    socket.userID = userID;
    // handle events
    require('./gamedata.socket.js')(socket, db);

  });
  return io;
};
