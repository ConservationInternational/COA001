var I = require('../../test_helper');
var ToeType = require('../../../models/init').ToeType;
var FootTypeFamily = require('../../../models/init').FootTypeFamily;
var SnakeCamel = require('../../../support/snake_camel');

describe("/foot-type-families routes", function() {
  describe("GET /foot-type-families", function() {
    beforeEach(function(done) {
      ToeType
          .forge(SnakeCamel.camelCaseObject(I.Factory.build('toe_type_json')))
          .save()
          .then(function(toeType) {
            FootTypeFamily
                .forge(SnakeCamel.camelCaseObject(I.Factory.build('foot_type_family_json', {toe_type_id: toeType.attributes.id})))
                .save()
                .then(function(foot) {
                  console.log("oh ya?");
                  done();
                });
          });
    });

    it("gets a list of all foot type families", function() {
      var response = I.request({
        method: "GET",
        url: "/foot-type-families"
      });

      return I.Promise.all([
        I.expect(response).to.eventually.have.property('statusCode').that.eql(200),
        I.expect(response).to.eventually.have.deep.property('result.foot_type_families').that.has.length(1)
      ]);
    });
  });
});
