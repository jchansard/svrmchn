const StaticJSONDB = require("./static-json-db.js");
const filePath = "../gamedata/cards/cards.json";

module.exports.DB = function() {
  return new StaticJSONDB(filePath);
}
