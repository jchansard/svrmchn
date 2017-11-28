const StaticJSONDB = require('./static-json-db.js');
const filePath = "../gamedata/cards/abilities.json";

module.exports.DB = function() {
  return new StaticJSONDB(filePath);
}
