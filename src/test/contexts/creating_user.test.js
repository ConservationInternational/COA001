var I = require('../test_helper');
var CreatingUser = require('../../contexts/creating_user');


describe("CreatingUser", function() {
  it("should create a new Merchant", function() {
    var promise = CreatingUser({
      firstName: "Frank",
      lastName: "Reynolds",
      email: "frank@paddyspub.com"
    });

    return I.Promise.all([
      I.expect(promise).to.eventually.have.deep.property("attributes.firstName").that.eql("Frank"),
      I.expect(promise).to.eventually.have.deep.property("attributes.lastName").that.eql("Reynolds"),
      I.expect(promise).to.eventually.have.deep.property("attributes.email").that.eql("frank@paddyspub.com"),
      I.expect(promise).to.eventually.have.deep.property("attributes.token").that.is.a('string')
    ]);
  });

  context("email address already exists", function() {
    beforeEach(function() {
      return CreatingUser({
        firstName: "Dennis",
        lastName: "Reynolds",
        email: "owner@paddyspub.com"
      })
    });

    it("raises an error", function() {
      params = {
        firstName: "Mac",
        lastName: "McDonald",
        email: "owner@paddyspub.com"
      };
      var promise = CreatingUser(params);
      return I.expect(promise).to.be.eventually.rejectedWith(CreatingUser.EmailAlreadyUsedError, "Email already used: owner@paddyspub.com");
    });
  });
});