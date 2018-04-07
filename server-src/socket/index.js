const loginPlugin = require('./login.plugin.socket');
const messageEmitterPlugin = require('./message-emitter.plugin.socket');
const roomsPlugin = require('./rooms.plugin.socket');

module.exports = function(app, server) {
  let io = require('socket.io').listen(server);
  app.set('io', io);
  io.on('connection', (socket) => {
    // connect and disconnect
    console.log(`a user connected`);
    socket.on('disconnect', () => console.log(`a user disconnected`));
  });

  // set up namespaces
  createNamespace(app, io, "login", [loginPlugin]);
  createNamespace(app, io, "chat", [messageEmitterPlugin, roomsPlugin]);
  createNamespace(app, io, "game-browser", [roomsPlugin]);
};

function createNamespace(app, io, name /*string*/, plugins /* Plugin[] */) {
  let namespace = io.of(name);
  namespace.on('connection', (socket) => {
    console.log(`${socket.id} connected to ${name} namespace`);
    plugins.forEach((pluginFunction) => pluginFunction(app, namespace, socket));
  });

  namespace.on('disconnect', () => {
    console.log(`${socket.id} disconnected from ${name} namespace`);
  })

}
