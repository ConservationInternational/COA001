var I = require('../../test_helper');
var SnakeCamel = require('../../../support/snake_camel');
var ToeType = require('../../../models/init').ToeType;
var FootTypeFamily = require('../../../models/init').FootTypeFamily;
var Group = require('../../../models/init').Group;
var Subgroup = require('../../../models/init').Subgroup;
var Specie = require('../../../models/init').Specie;
var _ = require('lodash');

describe("/species routes", function() {
  describe("GET /species", function() {
    var footTypeFamilyToken = null;

    beforeEach(function(done) {
      var counts = [1, 1];
      var toeTypeJSONs = _.map(counts, function() { return I.Factory.build('toe_type_json') });
      var footTypeFamilyJSONs = _.map(counts, function() { return I.Factory.build('foot_type_family_json') });
      var groupJSONs = _.map(counts, function() { return I.Factory.build('group_json') });
      var subgroupJSONs = _.map(counts, function() { return I.Factory.build('subgroup_json') });
      var specieJSONs = _.map(counts, function() { return I.Factory.build('specie_json') });

      I.Promise.map(toeTypeJSONs, function(toeTypeJSON) {
        var attrs = SnakeCamel.camelCaseObject(toeTypeJSON);
        return ToeType.forge(attrs).save();
      }).map(function(toeType, index) {
        var attrs = SnakeCamel.camelCaseObject(footTypeFamilyJSONs[index]);
        attrs.toeTypeId = toeType.attributes.id;
        return FootTypeFamily.forge(attrs).save();
      }).map(function(footTypeFamily, index) {
        if (index == 0) {
          footTypeFamilyToken = footTypeFamily.attributes.token
        }
        var attrs = SnakeCamel.camelCaseObject(groupJSONs[index]);
        attrs.footTypeFamilyId = footTypeFamily.attributes.id;
        return Group.forge(attrs).save();
      }).map(function(group, index) {
        var attrs = SnakeCamel.camelCaseObject(subgroupJSONs[index]);
        attrs.groupId = group.attributes.id;
        return Subgroup.forge(attrs).save();
      }).map(function(subgroup, index) {
        var attrs = SnakeCamel.camelCaseObject(specieJSONs[index]);
        attrs.subgroup_id = subgroup.attributes.id;
        return Specie.forge(attrs).save();
      }).then(function(species) {
        done();
      })
    });

    it("gets a list of all species", function() {
      var response = I.request({
        method: "GET",
        url: "/species"
      });

      return I.Promise.all([
        I.expect(response).to.eventually.have.property('statusCode').that.eql(200),
        I.expect(response).to.eventually.have.deep.property('result.species').that.has.length(2)
      ]);
    });

    context("footTypeFamily is set", function() {
      it("get a list of all species in that foot type family", function() {
        var response = I.request({
          method: "GET",
          url: "/species?foot_type_family_token=" + footTypeFamilyToken
        });

        return I.Promise.all([
          I.expect(response).to.eventually.have.property('statusCode').that.eql(200),
          I.expect(response).to.eventually.have.deep.property('result.species').that.has.length(1)
        ]);
      });
    });
  });
});