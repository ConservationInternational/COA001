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
models.User = require('./user')(bookshelf, models, _.clone(props));
models.Bird = require('./bird')(bookshelf, models, _.clone(props));
models.Specie = require('./specie')(bookshelf, models, _.clone(props));
models.Subgroup = require('./subgroup')(bookshelf, models, _.clone(props));
models.Group = require('./group')(bookshelf, models, _.clone(props));
models.FootTypeFamily = require('./foot_type_family')(bookshelf, models, _.clone(props));
models.ToeType = require('./toe_type')(bookshelf, models, _.clone(props));

module.exports = models;
