var User = require('../models/user');
var Authenticating = require('../contexts/authenticating');

var emailUniqueConstraintViolation = "duplicate key value violates unique constraint \"users_email_unique\"";

function CreatingUser(params) {
  var password = params.password;
  var salt = Authenticating.salt();
  var hashedPassword = Authenticating.hash(password, salt);

  params.hashedPassword = hashedPassword;
  params.salt = salt;
  delete params.password

  return User.forge(params)
      .save()
      .error(function(e) {
        if (e.message == emailUniqueConstraintViolation) {
          throw new CreatingUser.EmailAlreadyUsedError(params.email);
        }
      });
}

function EmailAlreadyUsedError(email) {
  this.name = "EmailAlreadyUsedError";
  this.message = "Email already used: " + email;
}
EmailAlreadyUsedError.prototype = Object.create(Error.prototype);
EmailAlreadyUsedError.prototype.constructor = EmailAlreadyUsedError;
CreatingUser.EmailAlreadyUsedError = EmailAlreadyUsedError;

module.exports = CreatingUser;
