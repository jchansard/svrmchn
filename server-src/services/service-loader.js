let serviceLoader = null;
const RoomListService = require('./room-list.service').RoomListService;
const SocketUserService = require('./socket-user.service').SocketUserService;
const UserListService = require('./user-list.service').UserListService;
const logger = require('../logger')("Service Loader");

const availableServices = {
  roomList: "room-list",
  socketUsers: "socket-users",
  userList: "user-list"
}

function ServiceLoader() {
  if (serviceLoader !== null) {
    return serviceLoader;
  }
  this._constructors = {};
  this._constructors[availableServices.roomList] = RoomListService;
  this._constructors[availableServices.socketUsers] = SocketUserService;
  this._constructors[availableServices.userList] = UserListService;
  this._services = {};

  serviceLoader = this;
}

ServiceLoader.prototype = {
  load(serviceName) {
    if (!(serviceName in this._constructors)) {
      logger.error(`Invalid service requested: ${serviceName}`);
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
    logger.debug(`Loaded new service: ${serviceName}`);
    let newService = new this._constructors[serviceName]();
    this._services[serviceName] = newService;
    return newService;
  }
}

module.exports.ServiceLoader = ServiceLoader;
module.exports.availableServices = availableServices;
