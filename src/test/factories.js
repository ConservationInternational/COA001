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

function randomInt(max) {
  max = max || 100;
  return Math.floor(Math.random() * max);
}

// Bird
Factory.define('bird_json')
    .attr('found_location_type', oneOf(Bird.FOUND_LOCATION_TYPE))
    .attr('foot_condition_type', oneOf(Bird.FOOT_CONDITION_TYPE))
    .attr('eye_type', oneOf(Bird.EYE_TYPE))
    .attr('entanglement_type', oneOf(Bird.ENTANGLEMENT_TYPE))
    .attr('tie_location_type', oneOf(Bird.TIE_LOCATION_TYPE))
    .attr('refound', randomBool())
    .attr('collected', randomBool())
    .attr('oil', randomBool())
    .attr('verification_method', oneOf(Bird.VERIFICATION_METHOD));

// Toe Type
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

// Foot Type Family
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
    .attr('active', randomBool());

// Group
GROUP_NAMES = [
    "3-Toed Shorebirds",
    "4-Toed Shorebirds",
    "Albatrosses",
    "Coots",
    "Cormorants",
    "Corvids",
    "Cranes",
    "Diving Ducks",
    "Eagles",
    "Falcons"
];

Factory.define('group_json')
    .attr('name', oneOf(GROUP_NAMES))
    .attr('code', oneOf(_.map(GROUP_NAMES, function(name) { return name.substring(0, 4).toUpperCase() })))
    .attr('description', oneOf(_.map(GROUP_NAMES, function(name) { return name.toLowerCase() })))
    .attr('active', randomBool())
    .attr('composite', randomBool());

// Subgroup
SUBGROUP_NAMES = [
    "Albatrosses",
    "Auklets",
    "Canada Goose",
    "Coots",
    "Cranes",
    "Crows",
    "Dabbling Ducks",
    "Eagles",
    "Eiders",
    "Fulmars"
];

Factory.define('subgroup_json')
    .attr('name', oneOf(SUBGROUP_NAMES));

// Specie
SPECIES_NAMES = [
    "American Coot",
    "American Crow",
    "American Robin",
    "American Wigeon",
    "Ancient Murrelet",
    "Arctic Tern",
    "Bald Eagle",
    "Band-tailed Pigeon",
    "Belted Kingfisher",
    "Black Oystercatcher"
];

VERIFICATION_SOURCE = [
    "Beached Birds",
    "Birds of North America"
];

Factory.define('specie_json')
    .attr('name', oneOf(SPECIES_NAMES))
    .attr('code', oneOf(_.map(SPECIES_NAMES, function(name) { return name.substring(0, 4).toUpperCase() })))
    .attr('active', randomBool())
    .attr('sex_difference', randomBool())
    .attr('tarsus_min', randomInt())
    .attr('tarsus_max', randomInt())
    .attr('wing_min', randomInt())
    .attr('wing_max', randomInt())
    .attr('bill_min', randomInt())
    .attr('bill_max', randomInt())
    .attr('verification_source', oneOf(VERIFICATION_SOURCE));
