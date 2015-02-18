'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('addresses', function(table) {
    table.increments().primary();
    table.uuid('token').unique().notNullable();

    // Foreign Keys
    table.integer('state_id').unsigned().references('id').inTable('states').notNullable();

    table.string('street_address').notNullable();
    table.string('city').notNullable();
    table.string('zipcode').notNullable();

    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('addresses');
};
