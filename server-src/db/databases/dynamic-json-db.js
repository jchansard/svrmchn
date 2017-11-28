const Observable = require('rxjs/Observable').Observable;
const Subject = require('rxjs/AsyncSubject').AsyncSubject;

function DynamicJSONDB(name, client, hasher, linkedRecordResolver, linkedRecordDictionary) {
  this.name = name;
  this.client = client;
  this.hasher = hasher;
  this.linkedRecordResolver = linkedRecordResolver;
  this.linkedRecordDictionary = linkedRecordDictionary;
}

DynamicJSONDB.prototype.add = function(value) {
  let subject = new Subject();

  let responseStream = new Observable(stream => {
    let idKey = `id:${this.name}`;
    this.client.incr(idKey, (err, newID) => {
      if (err) throw err;
      // add the new value
      this.client.set(`${this.name}:${newID}`, value);
      this.client.sadd(this.name, newID);
      // return hashed ID
      stream.next(this.hasher.encode(newID));
      stream.complete();
    });
  });

  responseStream.subscribe(subject);
  return subject;
}

DynamicJSONDB.prototype.get = function(id) {
  return new Observable(stream => {
    let decodedID = this.hasher.decode(id);
    this.client.get(`${this.name}:${decodedID}`, (err, response) => {
      if (err) throw err;
      try {
        response = JSON.parse(response);
        this.linkedRecordResolver.resolveLinkedRecords(response, this.linkedRecordDictionary).subscribe((response) => {
          stream.next(response);
          stream.complete();
        });
      } catch (err) { stream.error(err); }
      //stream.next(response);
      //stream.complete();
    });
  })
}

module.exports = DynamicJSONDB;
