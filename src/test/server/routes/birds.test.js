var I = require('../../test_helper');
var _ = require('lodash');

describe("/birds routes", function() {
  describe("POST /birds", function() {
    it("creates a new Bird and associates it with a survey", function() {
      var surveyToken = "TODO: make a survey object and replace me"
      var json = I.Factory.build('bird_json', { survey_token: surveyToken });
      var response = I.request({
        method: "POST",
        url: "/birds",
        payload: json
      });

      return I.Promise.all([
        I.expect(response).to.eventually.have.property('statusCode').that.eql(201),
        I.expect(response).to.eventually.satisfy(function(response) {
          delete response.result.token;
          return _.isEqual(response.result, json);
        }),
        I.expect(response).to.eventually.have.deep.property('result.survey_token').that.eql(surveyToken)
      ]);
    });
  });
});