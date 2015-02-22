require('./factories');
var Factory = require('rosie').Factory;

var dbHelper = require('./database_helper');

var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var Promise = require("bluebird");

var server = require("../server/hapi");
function request(options) {
  return new Promise(function(resolve, reject) {
    server.inject(options, resolve)
  });
}

var CreatingUser = require('../contexts/creating_user');
var Jwt  = require('../support/jwt');
function requireAuthentication(method, url) {
  context("No Authorization header", function() {
    it("returns a 401 Unauthorized response", function() {
      var response = request({
        method: method,
        url: url
      });

      return expect(response).to.eventually.have.property('statusCode').that.eql(401);
    });
  });

  context("Has Authorization header", function() {
    var userToken;
    beforeEach(function() {
      return CreatingUser({
        firstName: "Frank",
        lastName: "Reynolds",
        email: "FRANK@PADDYSPUB.COM",
        password: "trashcan"
      })
          .then(function(user) {
            userToken = user.attributes.token;
          });
    });

    context("No user found", function() {
      it("returns a 401 Unauthorized response", function() {
        var response = request({
          method: method,
          url: url,
          headers: {
            Authorization: Jwt.tokenHeader("bull shit")
          }
        });

        return expect(response).to.eventually.have.property('statusCode').that.eql(401);
      });
    });

    context("User found", function() {
      it("doesn't return a 401 Unauthorized response", function() {
        var response = request({
          method: method,
          url: url,
          headers: {
            Authorization: Jwt.tokenHeader(userToken)
          }
        });

        return expect(response).to.eventually.have.property('statusCode').that.is.not.eql(401);
      });
    });
  })
}


module.exports = {
  chai: chai,
  expect: expect,
  Promise: Promise,
  server: server,
  request: request,
  Factory: Factory,
  requireAuthentication: requireAuthentication
};
