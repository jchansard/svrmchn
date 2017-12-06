let serviceLoader = null;
const RoomListService = require('./room-list.service').RoomListService;
const availableServices = {
  roomList: "room-list"
}

function ServiceLoader() {
  if (serviceLoader !== null) {
    return serviceLoader;
  }
  this._constructors = {};
  this._constructors[availableServices.roomList] = RoomListService;
  this._services = {};

  serviceLoader = this;
}

ServiceLoader.prototype = {
  load(serviceName) {
    if (!(serviceName in this._constructors)) {
      console.log(`invalid service requested: ${serviceName}`);
      return null;
    }
    else {
      if (serviceName in this._services) {
        return this._loadService(serviceName);
      }
      else {
        return this._loadNewService(serviceName);
      }
    }
  },

  _loadService(serviceName) {
    return this._services[serviceName];
  },

  _loadNewService(serviceName) {
    console.log(`loaded new service: ${serviceName}`);
    let newService = new this._constructors[serviceName]();
    this._services[serviceName] = newService;
    return newService;
  }
}

module.exports.ServiceLoader = ServiceLoader;
module.exports.availableServices = availableServices;
