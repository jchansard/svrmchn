const Redis = require('redis');
const Hashids = require('hashids');
const LinkedRecordResolver = require('./transformers/linked-record-resolver').LinkedRecordResolver;
const Observable = require('rxjs/Observable').Observable;

// models
const Databases = require ('./databases');
const PlayerDB = Databases.PlayerDB;
const UserDB = Databases.UserDB;
const CardDB = Databases.CardDB;
const AbilityDB = Databases.AbilityDB;

//todo: don't make static

function Database() {
  let client = Redis.createClient();
  let ids = new Hashids('hewn', 6);
  let linkedRecordResolver = new LinkedRecordResolver(this);

  client.on('connect', () => console.log('connected to db'));

  this.users = new UserDB(client, ids, linkedRecordResolver);
  this.gamedata = {
    players: new PlayerDB(client, ids, linkedRecordResolver),
    cards: new CardDB(linkedRecordResolver),
    abilities: new AbilityDB(linkedRecordResolver)

  //  cards: new CardDB(),
  //  abilities: new AbilityDB()
  }
}

Database.prototype.fromKey = function(key) {
  let dictionary = {
    "card" : this.gamedata.cards
  }

  return dictionary[key];
}

module.exports = Database;
