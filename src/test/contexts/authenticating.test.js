var I = require('../test_helper');
var Authenticating = require('../../contexts/authenticating');

describe("Authenticating", function() {
  var salt = "371024000.661984040026753";
  var hashedPassword = "2b7ee684c4a65c870ce95d678a6794e200f6079e";

  context("password is correct", function() {
    it("returns true", function() {
      I.expect(Authenticating("sucker", salt, hashedPassword)).to.be.true;
    });
  });

  context("password is incorrect", function() {
    it("returns false", function() {
      I.expect(Authenticating("notasucker", salt, hashedPassword)).to.be.false;
    });
  });
});