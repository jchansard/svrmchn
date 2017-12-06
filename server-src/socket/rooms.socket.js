const events = new require('../common/events/room-list.events').RoomListEvents();
const availableServices = require('../services/service-loader').availableServices;

// sets up the passed socket to respond to room requests
module.exports = (app, namespace, socket, userID) => {

  let roomService = app.get('services').load(availableServices.roomList);

  socket.on(events.createRoom, () => {
    let roomName = `${userID}'s room`;
    if (!roomExists(roomService.rooms, roomName)) {

      roomService.createRoom(roomName).subscribe((room) => {
        console.log("creating new room: " + roomName);
        namespace.to(socket.id).emit(events.roomListUpdate, roomService.rooms);
        // join room also
        socket.join(room.id);
        namespace.to(socket.id).emit(events.joinRoom, room.id);
      });
    }
  });

  socket.on(events.getRooms, () => {
    namespace.to(socket.id).emit(events.roomListUpdate, roomService.rooms)
  });

  // join room event
  // todo: figure out how i want to modularize
  socket.on(events.joinRoom, (room) => {
    console.log(`${userID} joining room ${room} [socketID: ${socket.id}]`);
    socket.join(room);
    namespace.to(socket.id).emit(events.roomChange, {id: room});
  });

  socket.on(events.leaveRoom, (room) => {
    console.log(`${userID} leaving room ${room}`);
    socket.leave(room);
  });
}

let roomExists = function(rooms, roomName) {
  return (rooms.find((room) => (room.id === roomName)) !== undefined);
}
