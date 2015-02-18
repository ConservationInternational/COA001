'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('birds', function(table) {
    table.increments().primary();
    table.uuid('token').unique().notNullable();

    // types
    table.enu('found_location_type', ['unknown', 'high', 'wrack', 'surf_line']).notNullable();
    table.enu('foot_condition_type', ['unknown', 'pliable', 'stiff', 'rotten', 'missing_feet']).notNullable();
    table.enu('eye_type', ['unknown', 'clear', 'sunk', 'gone', 'head_missing']).notNullable();
    table.enu('entanglement_type', ['net', 'fishing_line', 'hook', 'plastic', 'other_man_made_substance']); // can be null
    table.enu('tie_location_type', ['right_wing', 'left_wing', 'leg', 'bill', 'multiple']); // I think this can be null

    // colors
    var colors = ['none', 'white', 'red', 'orange', 'yellow', 'dark_green', 'blue', 'gray', 'brown', 'purple', 'black'];
    table.enu('closest_tie_color', colors);
    table.enu('middle_tie_color', colors);
    table.enu('farthest_tie_color', colors);

    // methods
    table.enu('verification_method', ['none', 'measurement_and_photograph', 'measurement', 'photograph']).notNullable();

    table.boolean('refound').notNullable();
    table.boolean('collected').notNullable();
    table.boolean('oil').notNullable();

    // comments
    table.text('comment');
    table.text('collected_comment');
    table.text('entanglement_comment');
    table.text('oil_comment');
    table.text('tie_location_comment');
    table.text('verification_comment');

    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('birds');
};
