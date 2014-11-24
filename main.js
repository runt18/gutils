var fs = require('fs');
var _ = require('underscore');

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

var writeJSON = function(path, obj) {
  if (_.isFunction(obj.toJSON)) {
    obj = obj.toJSON();
  }

  if (_.isArray(obj) && _.isFunction(obj[0].toJSON)) {
    obj = obj.map(function(item) { return item.toJSON(); });
  }

  fs.writeFileSync(path, JSON.stringify(obj));
};

var readJSON = function(path) {
  return JSON.parse(fs.readFileSync(path, 'utf-8'));
};

var fatal = function(message) {
  console.error(message.toString().red);
  process.exit(1);
};

var pretty = function(object, indent) {
  indent = indent || 2;
  JSON.stringify(object, null, indent);
};

module.exports = {
  writeJSON: writeJSON,
  readJSON: readJSON,
  readCSV: readCSV,
  writeCSV: writeCSV,
  fatal: fatal,
  pretty: pretty
};
