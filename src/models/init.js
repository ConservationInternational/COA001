/**
 * Initialize for models
 */

var bookshelf = require('../db/bookshelf');
var _ = require('lodash');
var uuid = require('node-uuid');

var props = {
  initialize: function() {
    this.on('saving', function() {
      this.attributes.token = uuid.v4();
    });
  },

  format: function(attrs) {
    return _.reduce(attrs, function(memo, val, key) {
      memo[_.snakeCase(key)] = val;
      return memo;
    }, {});
  },

  parse: function(attrs) {
    return _.reduce(attrs, function(memo, val, key) {
      memo[_.camelCase(key)] = val;
      return memo;
    }, {});
  }
};

var models = {};
models.User = require('./user')(bookshelf, _.clone(props));
models.Bird = require('./bird')(bookshelf, _.clone(props));

module.exports = models;
