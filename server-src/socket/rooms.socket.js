const events = new require('../common/events/room-list.events').RoomListEvents();

// sets up the passed socket to respond to room requests
module.exports = (namespace, socket, userID) => {

  let rooms = []; // todo: class when needed

  socket.on(events.createRoom, () => {
    let roomName = `${userID}'s room'`;
    if (!roomExists(rooms, roomName)) {
      console.log("creating new room: " + roomName);

      rooms.push({id: roomName})
      namespace.to(socket.id).emit(events.roomListUpdate, rooms);

      // join room also
      socket.join(roomName);
      namespace.to(socket.id).emit(events.joinRoom, roomName)
    }
  });

  socket.on(events.getRooms, () => {
    namespace.to(socket.id).emit(events.roomListUpdate, rooms)
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
