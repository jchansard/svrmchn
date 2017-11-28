const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/zip');
require('rxjs/add/operator/map');

function LinkedRecord(name, dbKey) {
  this.name = name;
  this.dbKey = dbKey;
}

function LinkedRecordResolver(database) {
  this.db = database;
}

LinkedRecordResolver.prototype.resolveLinkedRecords = function(object, propertyMap) {
  let requestStream = propertyMap.map((property) => {
    let ids = object[property.name];
    if (Array.isArray(object[property.name]))  {
      let requestStream = ids.map((id, index) => this.getLinkedRecord(id, property.dbKey));
      return Observable.zip.apply(this, requestStream).map((linkedRecords) => object[property.name] = linkedRecords);
    }
    else {
      return this.getLinkedRecord(ids, property.dbKey).map((linkedRecord) => object[property.name] = linkedRecord);
    }
  });

  return Observable.zip.apply(this, requestStream).map(() => object);
}


LinkedRecordResolver.prototype.getLinkedRecord = function(linkedRecordID, dbKey) {
  let linkedDB = this.db.fromKey(dbKey);
  return linkedDB.get(linkedRecordID);
}


module.exports.LinkedRecordResolver = LinkedRecordResolver;
module.exports.LinkedRecord = LinkedRecord;
