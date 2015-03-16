'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('toe_types', function(table) {
    table.increments().primary();
    table.uuid('token').unique().notNullable();

    table.string('code').notNullable();
    table.string('name').notNullable();
    table.boolean('active').notNullable();

    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('toe_types');
};
