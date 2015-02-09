var CreatingUser = require('../../contexts/creating_user');
var Boom = require('boom');
var Joi = require('joi');

var create = {
  method: "POST",
  path: "/users",
  handler: function(request, reply) {
    var params = {
      firstName: request.payload.first_name,
      lastName: request.payload.last_name,
      email: request.payload.email
    };

    CreatingUser(params)
        .then(function(user) {
          reply({
            first_name: user.attributes.firstName,
            last_name: user.attributes.lastName,
            email: user.attributes.email,
            token: user.attributes.token
          }).code(201);
        })
        .catch(CreatingUser.EmailAlreadyUsedError, function(e) {
          reply(Boom.wrap(e, 409));
        });
  },
  config: {
    validate: {
      payload: {
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required().email()
      },
      options: { abortEarly: false }
    }
  }
};

module.exports = [
  create
];
