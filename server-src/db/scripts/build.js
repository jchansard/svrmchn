let Database = require('../db.js');
let PlayerModel = require('../models').PlayerModel;
let db = new Database();

const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/operator/elementAt');
require('rxjs/add/operator/merge');
require('rxjs/add/operator/map');

let players = [
  new PlayerModel(4, [1,6,7]),
  new PlayerModel(4, [1,1,1]),
  new PlayerModel(3, [5,5,8]),
  new PlayerModel(2, [6,7,5])
];

let users = ["glasg0wn3d","OXBOW","online_playing","LEFT4SCRAPS"];

// add each player
let addPlayersStream = new Observable((stream) => {
  players.forEach((player) => db.players.add(JSON.stringify(player)).subscribe(() => stream.next()));
}).elementAt(players.length-1).map(() => console.log("players added"));

// add each user
let addUsersStream = new Observable((stream) => {
  users.forEach((user) => db.users.add(user).subscribe(() => stream.next()));
}).elementAt(users.length-1).map(() => console.log("users added"));;

// exit when done
let doneStream = addPlayersStream.merge(addUsersStream).elementAt(1).map(() => console.log("done"));
doneStream.subscribe(process.exit);
