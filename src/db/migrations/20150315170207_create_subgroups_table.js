'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('subgroups', function(table) {
    table.increments().primary();
    table.uuid('token').unique().notNullable();

    table.integer('group_id').unsigned().references('id').inTable('groups').notNullable();
    table.string('name').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('subgroups');
};
