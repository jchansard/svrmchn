const loginPlugin = require('./login.plugin.socket');
const messageEmitterPlugin = require('./message-emitter.plugin.socket');
const roomsPlugin = require('./rooms.plugin.socket');
const logger = require('../logger')("Socket");

module.exports = function(app, server) {
  let io = require('socket.io').listen(server);
  app.set('io', io);
  io.on('connection', (socket) => {
    // connect and disconnect
    logger.info(`A user connected`);
    socket.on('disconnect', () => logger.info(`A user disconnected`));
  });

  // set up namespaces
  createNamespace(app, io, "login", [loginPlugin]);
  createNamespace(app, io, "chat", [messageEmitterPlugin, roomsPlugin]);
  createNamespace(app, io, "game-browser", [roomsPlugin]);
};

function createNamespace(app, io, name /*string*/, plugins /* Plugin[] */) {
  let namespace = io.of(name);
  namespace.on('connection', (socket) => {
    logger.debug(`${socket.id} connected to namespace: ${name}`);
    plugins.forEach((pluginFunction) => pluginFunction(app, namespace, socket));
  });

  namespace.on('disconnect', () => {
    logger.debug(`${socket.id} disconnected from namespace: ${name}`);
  })

}
