var I = require('../../test_helper');
var CreatingUser = require('../../../contexts/creating_user');

describe("/auth endpoints", function() {
  describe("POST /auth", function() {
    context("user with email does not exist", function() {
      it("throws a 404", function() {
        var response = I.request({
          method: "POST",
          url: "/auth",
          payload: {
            email: "mac@paddyspub.com",
            password: "ocularpatdown"
          }
        });

        return I.Promise.all([
          I.expect(response).to.eventually.have.property("statusCode").that.eql(404),
          I.expect(response).to.eventually.have.deep.property("result.message").that.eql("User with email does not exist")
        ]);
      });
    });

    context("user with email exists", function() {
      beforeEach(function() {
        return CreatingUser({
          firstName: "Mac",
          lastName: "McDonald",
          email: "mac@paddyspub.com",
          password: "ocularpatdown"
        });
      });

      context("correct password", function() {
        it("authenticates the user", function() {
          var response = I.request({
            method: "POST",
            url: "/auth",
            payload: {
              email: "mac@paddyspub.com",
              password: "ocularpatdown"
            }
          });

          return I.Promise.all([
            I.expect(response).to.eventually.have.property("statusCode").that.eql(201)
          ]);
        });
      });

      context("incorrect password", function() {
        it("throws a 404", function() {
          var response = I.request({
            method: "POST",
            url: "/auth",
            payload: {
              email: "mac@paddyspub.com",
              password: "chimichanga"
            }
          });

          return I.Promise.all([
            I.expect(response).to.eventually.have.property("statusCode").that.eql(404),
            I.expect(response).to.eventually.have.deep.property("result.message").that.eql("Incorrect password")
          ]);
        });
      });
    });
  });
});