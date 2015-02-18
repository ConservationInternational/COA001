var I = require('../../test_helper');

describe("/birds routes", function() {
  describe("POST /birds", function() {
    it("creates a new Bird", function() {
      var response = I.request({
        method: "POST",
        url: "/birds",
        payload: {
          found_location_type: "wrack",
          foot_condition_type: "missing_feet",
          eye_type: "head_missing",
          entanglement_type: "net",
          tie_location_type: "right_wing",
          refound: false,
          collected: true,
          oil: true,
          verification_method: "none"
        }
      });

      return I.Promise.all([
        I.expect(response).to.eventually.have.property('statusCode').that.eql(201),
        I.expect(response).to.eventually.have.deep.property('result').that.eql("sheit")
      ]);
    });
  });
});