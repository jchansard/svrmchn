const events = new require('../common/events/login.events').LoginEvents();
let users = [];

module.exports = (app, namespace, socket, userID) => {

  socket.on(events.login, (userName) => {
    console.log(`${userName} is logging in`);
    if (!users.includes(userName)) {
      console.log('made it');
      users.push(userName);
      namespace.to(socket.id).emit(events.loggedIn, true);
    }
  });

  socket.on(events.logout, (userName) => {
    let index = users.indexOf(userName);
    if (index > -1) { users.splice(index,1); }
  })
}
