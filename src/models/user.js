var bookshelf = require('../db/bookshelf');
var _ = require('lodash');
var uuid = require('node-uuid');

var User = bookshelf.Model.extend({
  tableName: "users",

  initialize: function () {
    this.on('saving', function () {
      this.set('token', uuid.v4());
    });
  },

  format: function (attrs) {
    return _.reduce(attrs, function (memo, val, key) {
      memo[_.snakeCase(key)] = val;
      return memo;
    }, {});
  },

  parse: function (attrs) {
    return _.reduce(attrs, function (memo, val, key) {
      memo[_.camelCase(key)] = val;
      return memo;
    }, {});
  }
});

module.exports = User;
