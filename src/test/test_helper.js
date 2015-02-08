var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var Promise = require("bluebird");

module.exports = {
  chai: chai,
  expect: expect,
  Promise: Promise
}
