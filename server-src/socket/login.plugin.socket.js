const events = new require('../common/events/login.events').LoginEvents();
const availableServices = require('../services/service-loader').availableServices;

module.exports = (app, namespace, socket) => {

  let socketUsers = app.get('services').load(availableServices.socketUsers);

  socket.on(events.login, (userName) => {
    socketUsers.add(socket.id, userName);
  });

  socket.on(events.logout, (userName) => {
    socketUsers.remove(socket.id);
  })
}
