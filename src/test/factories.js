var Factory = require('rosie').Factory;
var Bird = require('../models/init').Bird;
var ToeType = require('../models/init').ToeType;
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

TOE_TYPE_CODES = {
  F: "Free",
  FM: "Feet Missing",
  L: "Lobed",
  O: "Other",
  U: "Unknown",
  W: "Webbed"
};

Factory.define('toe_type_json')
    .attr('code', oneOf(_.keys(TOE_TYPE_CODES)))
    .attr('name', oneOf(_.values(TOE_TYPE_CODES)))
    .attr('active', randomBool());

FOOT_TYPE_FAMILY_NAMES = [
    "Alcids",
    "Kingfishers",
    "Loons",
    "Pheasants",
    "Deandra Reynolds Bird"
];

Factory.define('foot_type_family_json')
    .attr('name', oneOf(FOOT_TYPE_FAMILY_NAMES))
    .attr('description', "it's a foot type!")
    .attr('active', randomBool())