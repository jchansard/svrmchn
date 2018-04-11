const winston = require('winston');

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

class FormatterBuilder {
  constructor(source) {
    this._source = source;
  }

  buildFormatter() {
    var source = this._source;

    return function(args) {
      let colorizer = new Colorizer();
      let levelWithColor = colorizer.colorizeByLevel(args.level);
      let sourceWithColor = colorizer.colorize(` (${source}):`, "magenta", "black");
      let formattedMessage = `${levelWithColor}${sourceWithColor} ${args.message}`;
      if (Object.keys(args.meta).length > 0) { return `${formattedMessage} [${JSON.stringify(args.meta)}]`; }
      else { return formattedMessage; }
    }
  }
}

class Colorizer {
  constructor() {}

  colorize(text, fgColor, bgColor) {
    fgColor = (fgColor) ? `\x1b[${fgColors[fgColor]}m` : "";
    bgColor = (bgColor) ? `\x1b[${bgColors[bgColor]}m`: "";
    return `${bgColor}${fgColor}${text}\x1b[0m`;
  }

  colorizeByLevel(level) {
    let text = level.toUpperCase();
    switch(text) {
      case "DEBUG":
        return this.colorize(this._pad(text, 5), "blue", "black");
      case "ERROR":
        return this.colorize(this._pad(text, 5), "red", "black");
      case "INFO":
        return this.colorize(this._pad(text, 5), "green", "black");
      default:
        return this.colorize(this._pad(text, 5), "white", "black");
    }
  }

  _pad(text, length) {
    if (text.length >= length) {
      return text;
    }
    else {
      return this._padRecursively(" " + text, length)
    }
  }

  _padRecursively(text, length) {
    return (text.length < length) ? this._padRecursively(" " + text, length) : text;
  }
}

function buildLogger(source) {
  level = "debug";

  let formatter = new FormatterBuilder(source).buildFormatter();
  return new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        formatter: formatter,
        level: level
      })
    ]
  });
}

module.exports = buildLogger;
