const winston = require('winston');
const timestampFormat = () => (new Date()).toLocaleTimeString();

let debugLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
        //timestamp: timestampFormat,
        colorize: true,
      })
  ]
});

debugLogger.level = "debug";

module.exports = debugLogger;
