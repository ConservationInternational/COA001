FOUND_LOCATION_TYPE = [
    "unknown",
    "high",
    "wrack",
    "surf_line"
];

FOOT_CONDITION_TYPE = [
    "unknown",
    "pliable",
    "stiff",
    "rotten",
    "missing_feet"
];

EYE_TYPE = [
    "unknown",
    "clear",
    "sunk",
    "gone",
    "head_missing"
];

ENTANGLEMENT_TYPE = [
    "net",
    "fishing_line",
    "hook",
    "plastic",
    "other_man_made_substance"
];

TIE_LOCATION_TYPE = [
    "right_wing",
    "left_wing",
    "leg",
    "bill",
    "multiple"
];

TIE_COLORS = [
    "none",
    "white",
    "red",
    "orange",
    "yellow",
    "dark_green",
    "blue",
    "gray",
    "brown",
    "purple",
    "black"
];

VERIFICATION_METHOD = [
    "none",
    "measurement_and_photograph",
    "measurement",
    "photograph"
];


module.exports = function(bookshelf, props) {
  props.tableName = "birds";
  var Bird = bookshelf.Model.extend(props);

  Bird.FOUND_LOCATION_TYPE = FOUND_LOCATION_TYPE;
  Bird.FOOT_CONDITION_TYPE = FOOT_CONDITION_TYPE;
  Bird.EYE_TYPE = EYE_TYPE;
  Bird.ENTANGLEMENT_TYPE = ENTANGLEMENT_TYPE;
  Bird.TIE_LOCATION_TYPE = TIE_LOCATION_TYPE;
  Bird.TIE_COLORS = TIE_COLORS;
  Bird.VERIFICATION_METHOD = VERIFICATION_METHOD;

  return Bird;
};