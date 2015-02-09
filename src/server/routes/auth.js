var Boom = require('boom');
var User = require('../../models/user');
var Authenticating = require('../../contexts/authenticating');

var create = {
  method: "POST",
  path: "/auth",
  handler: function(request, reply) {
    var email = request.payload.email;
    var password = request.payload.password;

    new User({ email: email })
        .fetch({ require: true })
        .then(function(user) {
          var salt = user.attributes.salt;
          var hashedPassword = user.attributes.hashedPassword;

          if (Authenticating(password, salt, hashedPassword)) {
            reply().code(201);
          } else {
            reply(Boom.notFound("Incorrect password"));
          }
        })
        .catch(User.NotFoundError, function(e) {
          reply(Boom.notFound("User with email does not exist"));
        });
  }
};

module.exports = [
  create
];