'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments().primary();
    table.uuid('token').unique().notNullable();
    table.string('email').unique().notNullable();
    table.string('first_name').notNullable();
    table.string('middle_initial');
    table.string('last_name').notNullable();
    table.string('hashed_password').notNullable();
    table.string('salt').notNullable();

    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
