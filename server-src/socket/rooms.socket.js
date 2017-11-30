// sets up the passed socket to respond to room requests
module.exports = (io, socket) => {

  let rooms = [];

  socket.on("createRoom", () => { // todo: share events
    let roomNumber = rooms.length;
    console.log("creating new room: " + roomNumber);

    rooms.push(roomNumber)
    io.to(socket.id).emit("roomListUpdate", rooms);
  });

  socket.on("getRooms", () => {
    io.to(socket.id).emit("roomListUpdate", rooms)
  });
}
