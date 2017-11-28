const Observable = require('rxjs/Observable').Observable;
const Subject = require('rxjs/AsyncSubject').AsyncSubject;

function UserDB(client, hasher) {
  this.client = client;
  this.hasher = hasher;
}

UserDB.prototype.add = function(name) {
  let subject = new Subject();

  let requestStream = new Observable((stream => {
    this.client.incr("id:user", (err, id) => {
      let hashedID = this.hasher.encode(id);
      this.client.set(`user:${name}`, hashedID);
      stream.next(hashedID);
      stream.complete();
    });
  }));

  requestStream.subscribe(subject);
  return subject;
};

UserDB.prototype.get = function(name) {
  return new Observable((stream => {
    this.client.get(`user:${name}`, (err, id) => {
      stream.next(id);
      stream.complete();
    })
  }))
}

module.exports.DB = UserDB;
