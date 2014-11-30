var fs = require('fs');
var _ = require('underscore');
var chalk = require('chalk');

var fatal = function(message) {
  console.error(chalk.red(message.toString()));
  process.exit(1);
};

var success = function(message) {
  console.log(chalk.green(message.toString()));
};

var pretty = function(object, indent) {
  indent = indent || 2;
  return JSON.stringify(object, null, indent);
};

var readCSV = function(path) {
  return fs.readFileSync(path, 'utf-8')
    .split('\n')
    .map(function(line) { return line.split(','); });
};

var writeCSV = function(path, data, header) {
  var lines = [];

  if (header) {
    lines = lines.concat(header);
  }

  lines = lines.concat(data);

  fs.writeFileSync(path, lines.join('\n'));
};

var writeJSON = function(path, obj, indent) {
  if (_.isFunction(obj.toJSON)) {
    obj = obj.toJSON();
  }

  if (_.isArray(obj) && _.isFunction(obj[0].toJSON)) {
    obj = obj.map(function(item) { return item.toJSON(); });
  }

  var str = indent ? pretty(obj, indent) : JSON.stringify(obj);

  fs.writeFileSync(path, str);
};

var readJSON = function(path) {
  return JSON.parse(fs.readFileSync(path, 'utf-8'));
};

module.exports = {
  writeJSON: writeJSON,
  readJSON: readJSON,
  readCSV: readCSV,
  writeCSV: writeCSV,
  fatal: fatal,
  success: success,
  pretty: pretty
};
