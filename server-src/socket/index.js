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
  let userID = ["glasg0wn3d", "OXBOW", "online_playing", "LEFT4SCRAPS"][Math.floor(Math.random()*4)]; //todo: obviously
  createNamespace(app, io, "login", [loginPlugin])
  createNamespace(app, io, "chat", [messageEmitterPlugin, roomsPlugin], userID);
  createNamespace(app, io, "game-browser", [roomsPlugin], userID);
};

function createNamespace(app, io, name /*string*/, plugins /* Plugin[] */, userID /*todo:remove*/) {
  let namespace = io.of(name);
  namespace.on('connection', (socket) => {
    console.log(`${userID} connected to ${name} namespace`);
    plugins.forEach((pluginFunction) => {
      pluginFunction(app, namespace, socket, userID);
    });
  });

  namespace.on('disconnect', () => {
    console.log(`${userID} disconnected from ${name} namespace`);
  })

}
