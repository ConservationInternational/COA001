var I = require('../../test_helper');

describe("/users routes", function() {
  describe("POST /users", function() {
    it("does something", function() {
      var response = I.request({
        method: "POST",
        url: "/users",
        payload: {
          first_name: "Charlie",
          last_name: "Kelly",
          email: "charlie@paddyspub.com"
        }
      });

      return I.Promise.all([
        I.expect(response).to.eventually.have.property("statusCode").that.eql(201),
        I.expect(response).to.eventually.have.deep.property("result.first_name").that.eql("Charlie"),
        I.expect(response).to.eventually.have.deep.property("result.last_name").that.eql("Kelly"),
        I.expect(response).to.eventually.have.deep.property("result.email").that.eql("charlie@paddyspub.com"),
        I.expect(response).to.eventually.have.deep.property("result.token").that.is.not.null
      ]);
    });

    context("duplicate request", function() {
      it("returns an error on the second request", function() {
        var firstResponse = I.request({
          method: "POST",
          url: "/users",
          payload: {
            first_name: "Charlie",
            last_name: "Kelly",
            email: "charlie@paddyspub.com"
          }
        });

        var secondResponse = I.request({
          method: "POST",
          url: "/users",
          payload: {
            first_name: "Charlie",
            last_name: "Kelly",
            email: "charlie@paddyspub.com"
          }
        });

        return I.Promise.all([
          I.expect(firstResponse).to.eventually.have.property("statusCode").that.eql(201),
          I.expect(secondResponse).to.eventually.have.property("statusCode").that.eql(409),
          I.expect(secondResponse).to.eventually.have.deep.property("result.message").that.eql("Email already used: charlie@paddyspub.com")
        ]);
      })
    });

    context("validation failure", function() {
      it("returns an error", function() {
        var response = I.request({
          method: "POST",
          url: "/users",
          payload: {
            first_name: 0,
            last_name: ["What?"],
            email: "whatdyasay??"
          }
        });

        return I.Promise.all([
          I.expect(response).to.eventually.have.property("statusCode").that.eql(400),
          I.expect(response).to.eventually.have.deep.property("result.validation.keys").that.has.length(3),
          I.expect(response).to.eventually.have.deep.property("result.validation.keys").that.contain("first_name"),
          I.expect(response).to.eventually.have.deep.property("result.validation.keys").that.contain("last_name"),
          I.expect(response).to.eventually.have.deep.property("result.validation.keys").that.contain("email")
        ]);
      })
    })
  });
});
