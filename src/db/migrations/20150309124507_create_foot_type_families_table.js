'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('foot_type_families', function(table) {
    table.increments().primary();
    table.uuid('token').unique().notNullable();

    table.integer('toe_type_id').unsigned().references('id').inTable('toe_types').notNullable();

    table.string('name').notNullable();
    table.string('description');
    table.boolean('active').notNullable();

    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('foot_type_families');
};
