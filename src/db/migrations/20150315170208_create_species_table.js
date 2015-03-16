'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('species', function(table) {
    table.increments().primary();
    table.uuid('token').unique().notNullable();

    //table.integer('foot_type_family_id').unsigned().references('id').inTable('foot_type_families').notNullable();
    //table.integer('group_id').unsigned().references('id').inTable('groups').notNullable();
    table.integer('subgroup_id').unsigned().references('id').inTable('subgroups').notNullable();

    table.string('code').notNullable();
    table.string('name').notNullable();

    table.integer('tarsus_min').notNullable();
    table.integer('tarsus_max').notNullable();
    table.integer('wing_min').notNullable();
    table.integer('wing_max').notNullable();
    table.integer('bill_min').notNullable();
    table.integer('bill_max').notNullable();

    table.string('verification_source').notNullable();

    table.boolean('sex_difference').notNullable();
    table.boolean('active').notNullable();
  })
};

exports.down = function(knex, Promise) {
  
};
