const GameDataEvents = require('../common/events/gamedata-events').GameDataEvents;
const db = require('../db/db');

// var currID = 0;
// var abilities = [{id:1}];
// var names = ['xxSefirothxx','OXBOW','online_playing','lighthaus','EEEEK','kik','falafelEnthusiast','LEFT4SCRAPS'];
// var commanders = ['man','strongman','weakman'];
// var deck = [getMockActor('strongman'), getMockActor('bear'), getMockActor('bwolf'), getMockActor('tiger')];
//
// function getMockPlayerData() {
//   let name = Math.floor(Math.random() * names.length);
//   let commander = Math.floor(Math.random() * commanders.length);
//   currID++;
//   return {
//     id: currID,
//     name: name,
//     commander: getMockActor(commander),
//     deck: deck
//   }
// }
//
// function getMockActor(name) {
//   return {
//       id: 1,
//       name: name,
//       abilities: abilities,
//       animations: [
//         {
//           name: 'idle',
//           beginFrame: 1,
//           endFrame: 1
//         },
//         {
//           name: 'walk',
//           beginFrame: 1,
//           endFrame: 4
//         }
//       ]
//   };
// }

//db.Players.add(JSON.stringify(getMockPlayerData())).subscribe((id)=>console.log(id));

// sets up the passed socket to respond to player data request events
module.exports = (socket, db) => {
  let events = new GameDataEvents();
  socket.on(events.loadPlayerEvent, () => {
    console.log(socket.userID);
    db.gamedata.players.get(socket.userID).subscribe((response) => socket.json.emit(events.loadPlayerResponseEvent, response))
  }
  );
}
