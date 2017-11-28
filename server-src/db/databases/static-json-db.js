const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/of');

function StaticJSONDB(filePath) {
  this.json = require(filePath);
}

StaticJSONDB.prototype.get = function(id) {
  return new Observable.of(this.json.find((currentObject) => currentObject.id === id));
}

module.exports = StaticJSONDB;
