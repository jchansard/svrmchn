const events = new require('../common/events/room-list.events').RoomListEvents();
const availableServices = require('../services/service-loader').availableServices;
const MessageEmitter = require('./message-emitter').MessageEmitter;

// sets up the passed socket to respond to room requests
module.exports = (app, namespace, socket) => {

  let roomService = app.get('services').load(availableServices.roomList);
  let userService = app.get('services').load(availableServices.userList);
  let messageEmitter = new MessageEmitter(socket);

  // todo: modularize better.......
  socket.on(events.createRoom, () => {
    let roomName = `${userID}'s room`;
    if (!roomExists(roomService.rooms, roomName)) { // TODO: what is this

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
    let userID = userService.getUserNameFromSocket(socket.id);
    //console.dir(room);
    //let roomID = room.id; //roomService.getRoomID(room);
//    room.id = (room.isWhisper) ? `w/${room.id}` : `p/${room.id}`
    console.log(`${userID} joining room ${room} [socketID: ${socket.id}]`);
    if (!roomService.roomExists(room)) {
      roomService.createRoom(room);
    }
    socket.join(room);
    namespace.to(socket.id).emit(events.roomChange, room);
    messageEmitter.broadcastToRoom({
      text: `${userID} has joined the room`,
      room: room,
      sender: 'Server'
    })
  });

  socket.on(events.leaveRoom, (room) => {
    let userID = userService.getUserNameFromSocket(socket.id);
    console.log(`${userID} leaving room ${room}`);
    socket.leave(room);
    messageEmitter.broadcastToRoom({
      text: `${userID} left the room`,
      room: room,
      sender: 'Server'
    })
  });
}

let roomExists = function(rooms, roomName) {
  return (rooms.find((room) => (room.id === roomName)) !== undefined);
}
