var sha1 = require('sha1');
var bcrypt = require('bcrypt');

function hash(password, salt) {
  var pepper = "aMRbgUVL0fTilT";
  var intermediate = password + pepper + salt;
  return sha1(intermediate);
}

function salt() {
  return bcrypt.genSaltSync(10);
}

function Authenticating(password, salt, hashedPassword) {
  return hash(password, salt) === hashedPassword;
}

Authenticating.hash = hash;
Authenticating.salt = salt;
module.exports = Authenticating;