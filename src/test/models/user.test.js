var expect = require('../test_helper').expect;
var Promise = require("bluebird");
var User = require('../../models/user');

describe(User.constructor.name, function() {
  describe('#save', function() {
    it('should save', function() {
      var u = new User({
        firstName: "Dee",
        lastName: "Reynolds",
        email: "dee@paddyspub.com"
      });
      expect(u.isNew()).to.be.true;

      var promise = u.save();
      return Promise.all([
        expect(promise).to.eventually.have.deep.property("attributes.firstName").that.eqls("Dee"),
        expect(promise).to.eventually.have.deep.property("attributes.lastName").that.eqls("Reynolds"),
        expect(promise).to.eventually.have.deep.property("attributes.email").that.eqls("dee@paddyspub.com"),
        expect(promise).to.eventually.have.deep.property("attributes.token").that.is.a("string")
      ]);
    });
  });
});
