var Factory = require('rosie').Factory;
var Bird = require('../models/init').Bird;
var _ = require('lodash');

function oneOf(array) {
  return function() {
    return _.sample(array);
  };
}

function randomBool() {
  return oneOf([true, false]);
}

Factory.define('bird_json')
    .attr('found_location_type', oneOf(Bird.FOUND_LOCATION_TYPE))
    .attr('foot_condition_type', oneOf(Bird.FOOT_CONDITION_TYPE))
    .attr('eye_type', oneOf(Bird.EYE_TYPE))
    .attr('entanglement_type', oneOf(Bird.ENTANGLEMENT_TYPE))
    .attr('tie_location_type', oneOf(Bird.TIE_LOCATION_TYPE))
    .attr('refound', randomBool())
    .attr('collected', randomBool())
    .attr('oil', randomBool())
    .attr('verification_method', oneOf(Bird.VERIFICATION_METHOD))
