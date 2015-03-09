/*global beforeEach, after */
'use strict';

var Promise = require('bluebird');
var knex = require('../db/bookshelf').knex;

var tables = [
    'users',
    'birds',
    'toe_types',
    'foot_type_families'
];

function truncate() {
  return Promise.each(tables, function(table) {
    console.log("truncating " + table);
    return knex.raw('truncate table ' + table + ' cascade');
  });
}

// Truncate before each test runs, and after all tests run
beforeEach(function() {
  return truncate();
});
after(function() {
  return truncate();
});

module.exports = {
  truncate: truncate
};
