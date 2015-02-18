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

module.exports = {
  chai: chai,
  expect: expect,
  Promise: Promise,
  server: server,
  request: request,
  Factory: Factory
}
