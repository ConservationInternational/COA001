var Knex = require('knex');
var Bookshelf = require('bookshelf');
var dbConfig = require('../db/knexfile')[process.env.NODE_ENV || "development"];

var knex = new Knex(dbConfig);
knex.config = dbConfig;

var bookshelf = new Bookshelf(knex);

module.exports = bookshelf;
