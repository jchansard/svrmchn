const events = new require('../common/events/login.events').LoginEvents();
const availableServices = require('../services/service-loader').availableServices;

module.exports = (app, namespace, socket) => {

  let users = app.get('services').load(availableServices.userList);

  socket.on(events.login, (userName) => {
    // TODO: use a user object
    users.connect(socket.id, {userName: userName});
  });

  socket.on(events.logout, (userName) => {
    users.disconnect(socket.id);
  })
}
