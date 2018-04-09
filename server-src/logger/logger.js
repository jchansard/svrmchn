const debugging = true;
const winston = require('winston');
//const timestampFormat = () => (new Date()).toLocaleTimeString();

const fgColors = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37
}

const bgColors = {
  black: 40,
  red: 41,
  green: 42,
  yellow: 43,
  blue: 44,
  magenta: 45,
  cyan: 46,
  white: 47
}

function colorize(text, fgColor, bgColor) {
  fgColor = (fgColor) ? `\x1b[${fgColors[fgColor]}m` : "";
  bgColor = (bgColor) ? `\x1b[${bgColors[bgColor]}m`: "";
  return `${bgColor}${fgColor}${text}\x1b[0m`;
}

function colorizeByLevel(level) {
  level = level.toUpperCase();
  switch(level) {
    case "DEBUG":
      return colorize(level, "blue", "black");
    case "ERROR":
      return colorize(level, "red", "black");
    case "INFO":
      return colorize(level, "white", "black");
    default:
      return colorize(level, "white", "black");
  }
}

function buildFormatter(source) {
  return function(args) {
    let thisSource = ` (${source}):`;
    let string = `${colorizeByLevel(args.level)}${colorize(thisSource, "green", "black")} ${args.message}`;
    if (Object.keys(args.meta).length > 0) { string = string + ` [${JSON.stringify(args.meta)}]`; }
    return string;
  }
}

var level = (debugging) ? "debug" : "info";

module.exports = function(source) {
  let formatter = buildFormatter(source);
  let logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
          //timestamp: timestampFormat,
          colorize: true,
          formatter: formatter,
          level: level
        })
    ]
  });
  return logger;
}

  //
  // _debugging: debugging,
  // _colorize: function(text) {
  //   return `\x1b[32m(${text})\x1b[0m`;
  // },
  //
  // logger: debugLogger,
  //
  // log: function(source, message, meta) {
  //   if (!this._debugging) { return; }
  //   this.logger.debug(`${this._colorize(source)} ${message}`, meta);
  // },
  //
  // error: function(source, message, meta) {
  //   this.logger.error(`${this._colorize(source)} ${message}`, meta);
  // }
  // }
