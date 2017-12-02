const RoomListEvents = require('../common/events/room-list-events').RoomListEvents;

// sets up the passed socket to respond to room requests
module.exports = (io, socket) => {

  let roomListEvents = new RoomListEvents();
  let rooms = [];

  socket.on(roomListEvents.createRoom, () => { // todo: share events
    let roomNumber = rooms.length;
    console.log("creating new room: " + roomNumber);

    rooms.push({id:roomNumber})
    io.to(socket.id).emit(roomListEvents.roomListUpdate, rooms);
  });

  socket.on(roomListEvents.getRooms, () => {
    io.to(socket.id).emit(roomListEvents.roomListUpdate, rooms)
  });
}
