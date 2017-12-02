const RoomListEvents = require('../common/events/room-list.events').RoomListEvents;

// sets up the passed socket to respond to room requests
module.exports = (io, socket) => {

  let roomListEvents = new RoomListEvents();
  let rooms = []; // todo: class when needed

  socket.on(roomListEvents.createRoom, () => { // todo: share events
    console.log("creating new room: " + rooms.length);

    rooms.push({id: `${socket.userID}'s room`})
    io.to(socket.id).emit(roomListEvents.roomListUpdate, rooms);
  });

  socket.on(roomListEvents.getRooms, () => {
    io.to(socket.id).emit(roomListEvents.roomListUpdate, rooms)
  });
}
