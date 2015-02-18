var Bird = require('../../models/init').Bird;
var Joi = require('joi');

var create = {
  method: "POST",
  path: "/birds",
  handler: function(request, reply) {
    var params = {
      foundLocationType: request.payload.found_location_type,
      footConditionType: request.payload.foot_condition_type,
      eyeType: request.payload.eye_type,
      entanglementType: request.payload.entanglement_type,
      tieLocationType: request.payload.tie_location_type,
      refound: request.payload.refound,
      collected: request.payload.collected,
      oil: request.payload.oil,
      verificationMethod: request.payload.verification_method
    };

    Bird
        .forge(params)
        .save()
        .then(function(bird) {
          reply(bird.attributes).code(201);
        });
  },
  config: {
    validate: {
      payload: {
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
