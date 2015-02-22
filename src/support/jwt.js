var Jwt  = require('jsonwebtoken');
var _ = require('lodash');

var User = require('../models/init').User;

var Boom = require('boom');

module.exports = {
  privateKey: "PRIVATE_KEY", // TODO(yu): change this

  tokenHeader: function(identifier, options) {
    options = options || {};
    return "Bearer " + Jwt.sign({ ut: identifier }, this.privateKey, options);
  },

  validateToken: function(decodedToken, callback) {
    var err;
    var userToken = decodedToken.ut;

    User
        .forge({ token: userToken })
        .fetch()
        .then(function(user) {
          callback(null, true, user);
        })
        .error(function(err) {
          callback(Boom.wrap(err, 401), false, null);
        })
  }
};