'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('states', function(table) {
    table.increments().primary();
    table.uuid('token').unique().notNullable();

    table.string('code').unique().notNullable();
    table.string('name').unique().notNullable();

    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('states');
};

