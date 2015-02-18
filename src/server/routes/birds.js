var Bird = require('../../models/init').Bird;
var Joi = require('joi');
var SnakeCamel = require('../../support/snake_camel');

var create = {
  method: "POST",
  path: "/birds",
  handler: function(request, reply) {
    var surveyToken = request.payload.survey_token;
    delete request.payload.survey_token;

    Bird
        .forge(SnakeCamel.camelCaseObject(request.payload))
        .save()
        .then(function(bird) {
          var json = SnakeCamel.snakeCaseObject(bird.attributes);
          delete json.id;
          json.survey_token = surveyToken;

          reply(json).code(201);
        })
        .error(function(e) {
          reply().code(202);
        })
  },
  config: {
    validate: {
      payload: {
        survey_token: Joi.string().required(),
        found_location_type: Joi.string().valid(Bird.FOUND_LOCATION_TYPE).required(),
        foot_condition_type: Joi.string().valid(Bird.FOOT_CONDITION_TYPE).required(),
        eye_type: Joi.string().valid(Bird.EYE_TYPE).required(),
        entanglement_type: Joi.string().valid(Bird.ENTANGLEMENT_TYPE),
        tie_location_type: Joi.string().valid(Bird.TIE_LOCATION_TYPE),
        closest_tie_color: Joi.string().valid(Bird.TIE_COLORS),
        middle_tie_color: Joi.string().valid(Bird.TIE_COLORS),
        farthest_tie_color: Joi.string().valid(Bird.TIE_COLORS),
        verification_method: Joi.string().valid(Bird.VERIFICATION_METHOD).required(),
        refound: Joi.boolean().required(),
        collected: Joi.boolean().required(),
        oil: Joi.boolean().required(),
        comment: Joi.string(),
        collected_comment: Joi.string(),
        entanglement_comment: Joi.string(),
        oil_comment: Joi.string(),
        tie_location_comment: Joi.string(),
        verification_comment: Joi.string()
      },
      options: { abortEarly: false }
    }
  }
};

module.exports = [
  create
];
