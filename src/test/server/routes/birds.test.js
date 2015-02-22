var I = require('../../test_helper');
var _ = require('lodash');
var Jwt  = require('../../../support/jwt');
var CreatingUser = require('../../../contexts/creating_user');

describe("/birds routes", function() {
  var userToken;

  I.requireAuthentication("POST", "/birds");

  describe("POST /birds", function() {
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

    it("creates a new Bird and associates it with a survey", function() {
      var surveyToken = "TODO: make a survey object and replace me"
      var json = I.Factory.build('bird_json', { survey_token: surveyToken });
      var response = I.request({
        method: "POST",
        url: "/birds",
        headers: {
          authorization: Jwt.tokenHeader(userToken)
        },
        payload: json
      });

      return I.Promise.all([
        I.expect(response).to.eventually.have.property('statusCode').that.eql(201),
        I.expect(response).to.eventually.satisfy(function(response) {
          delete response.result.token;
          return _.isEqual(response.result, json);
        }, "response result is not equal to: "+JSON.stringify(json)),
        I.expect(response).to.eventually.have.deep.property('result.survey_token').that.eql(surveyToken)
      ]);
    });
  });
});