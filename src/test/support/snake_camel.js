var I = require('../test_helper');
var SnakeCamel = require('../../support/snake_camel');

describe("SnakeCamel", function() {
  describe("#snakeCaseObject", function() {
    it("snake cases all properties on the object", function() {
      object = {
        firstName: "Frank",
        last_name: "Reynolds",
        status: "Deranged",
        location: "Trashcan",
        bestFriend: "Charlie Kelly"
      };

      I.expect(SnakeCamel.snakeCaseObject(object)).to.eql({
        first_name: "Frank",
        last_name: "Reynolds",
        status: "Deranged",
        location: "Trashcan",
        best_friend: "Charlie Kelly"
      });
    });
  });

  describe("#camelCaseObject", function() {
    it("camel cases all properties on the object", function() {
      object = {
        firstName: "Frank",
        last_name: "Reynolds",
        status: "Deranged",
        location: "Trashcan",
        bestFriend: "Charlie Kelly"
      };

      I.expect(SnakeCamel.camelCaseObject(object)).to.eql({
        firstName: "Frank",
        lastName: "Reynolds",
        status: "Deranged",
        location: "Trashcan",
        bestFriend: "Charlie Kelly"
      });
    });
  });
});
