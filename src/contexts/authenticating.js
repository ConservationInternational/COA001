var sha1 = require('sha1');

function hash(password, salt) {
  var pepper = "aMRbgUVL0fTilT"
  var intermediate = password + pepper + salt;
  return sha1(intermediate);
}

function Authenticating(password, salt, hashedPassword) {
  return hash(password, salt) === hashedPassword;
}

module.exports = Authenticating;