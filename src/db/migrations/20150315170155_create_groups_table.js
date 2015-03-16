'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('groups', function(table) {
    table.increments().primary();
    table.uuid('token').unique().notNullable();

    table.integer('foot_type_family_id').unsigned().references('id').inTable('foot_type_families').notNullable();
    table.string('name').notNullable();
    table.string('code').notNullable();
    table.string('description');

    table.boolean('active').notNullable();
    table.boolean('composite').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('groups');
};
