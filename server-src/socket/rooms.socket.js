const roomListEvents = new require('../common/events/room-list.events').RoomListEvents();

// sets up the passed socket to respond to room requests
module.exports = (io) => {

  let roomListNamespace = io.of(roomListEvents.NAMESPACE);
  let rooms = []; // todo: class when needed

  roomListNamespace.on('connection', (socket) => {
    console.log("connected to room list");
    socket.on('disconnect', () => console.log('disconnected from room list'));

    socket.on(roomListEvents.createRoom, () => {
      console.log("creating new room: " + rooms.length);

      rooms.push({id: `${socket.userID}'s room`})
      roomListNamespace.to(socket.id).emit(roomListEvents.roomListUpdate, rooms);
    });

    socket.on(roomListEvents.getRooms, () => {
      roomListNamespace.to(socket.id).emit(roomListEvents.roomListUpdate, rooms)
    });
  })
}
