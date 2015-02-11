var Knex = require('knex');
var Bookshelf = require('bookshelf');
var dbConfig = require('../db/knexfile')[process.env.NODE_ENV || "development"];

var database = dbConfig.connection.database;
dbConfig.connection.database = "COA001"; // legacy database
var knex = new Knex(dbConfig);

function drop() {
  console.log("Dropping database " + database);
  knex
      .raw('DROP DATABASE ' + database)
      .then(function() { console.log('Dropped database ' + database); })
      .error(function(e) {
        console.log('Error! ' + e.message); })
      .finally(function() { process.exit(); });
}

function create() {
  console.log("Creating database " + database);
  knex
      .raw('CREATE DATABASE ' + database)
      .then(function() { console.log('Created database ' + database); })
      .error(function(e) { console.log('Error! ' + e.message); })
      .finally(function() { process.exit(); });
}

action = process.argv[2];
if (action == "create") {
  create();
} else if (action == "drop") {
  drop();
} else {
    console.log("Don't recognize command: " + action);
    process.exit();
}
