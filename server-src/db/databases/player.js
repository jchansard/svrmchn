const DynamicJSONDB = require('./dynamic-json-db.js');
const LinkedRecord = require('../transformers').LinkedRecord;
const LinkedRecordResolver = require('../transformers').LinkedRecordResolver;
const cardsFilePath = "cards/cards.json";

let linkedRecordDictionary = [
  new LinkedRecord("commander", "card"),
  new LinkedRecord("deck", "card")
];

module.exports.DB = function(client, hasher, linkedRecordResolver) {
  return new DynamicJSONDB("player", client, hasher, linkedRecordResolver, linkedRecordDictionary);
}

function PlayerModel(commander, deck) {
  this.commander = commander;
  this.deck = deck;
}

module.exports.Model = PlayerModel;
