const FellEvents = require('../common/events/fell-events').FellEvents;
let fellEvents = new FellEvents();

let mockTree = {
    id: 1,
    color: 'brown',
    pointData: [
      [5, 5],
      [5, 900],
      [305, 900],
      [305, 5]
    ]
}

// tree response handler: emit a response event with a tree JSON
let treeResponse = (io) => (responseEvent) => {
  console.log('tree requested');
  io.json.emit(responseEvent, mockTree);
}

// sets up the passed IO to respond to tree request events
module.exports = (io) => {
  // todo: move this to its own module; figure out how to alter events after on(connection)
  io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', () => console.log('user disconnected'));

    fellEvents.treeRequestStream().subscribe(requestEvent => {
      socket.on(requestEvent, () => fellEvents.treeResponseStream().subscribe(treeResponse(io)));
    });
  });
  return io;
}
