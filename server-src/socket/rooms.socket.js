// sets up the passed socket to respond to room requests
module.exports = (io, socket) => {

  let roomID = 1;

  socket.on("createRoom", () => { // todo: share events
    console.log("creating new room");
    io.to(socket.id).emit("roomCreated", roomID++);
  }
  );
}
