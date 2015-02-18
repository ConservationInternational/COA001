/**
 * Initialize for models
 */

var bookshelf = require('../db/bookshelf');
var SnakeCamel = require('../support/snake_camel');
var _ = require('lodash');
var uuid = require('node-uuid');

var props = {
  initialize: function () {
    this.on('saving', function () {
      this.attributes.token = uuid.v4();
    });
  },

  format: SnakeCamel.snakeCaseObject,
  parse: SnakeCamel.camelCaseObject
};

var models = {};
models.User = require('./user')(bookshelf, _.clone(props));
models.Bird = require('./bird')(bookshelf, _.clone(props));

module.exports = models;
