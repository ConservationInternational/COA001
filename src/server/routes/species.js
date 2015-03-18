var FootTypeFamily = require('../../models/init').FootTypeFamily;
var Specie = require('../../models/init').Specie;
var SnakeCamel = require('../../support/snake_camel');
var _ = require('lodash');

function presentSpecie(specie) {
  var json = SnakeCamel.snakeCaseObject(specie.attributes);
  delete json.id;
  return json;
}

var read = {
  method: "GET",
  path: "/species",
  handler: function(request, reply) {
    var footTypeFamilyToken = request.query.foot_type_family_token;
    if (!!footTypeFamilyToken) {
      FootTypeFamily
          .forge({token: footTypeFamilyToken})
          .fetch({
            require: true,
            withRelated: ['groups.subgroups.species']
          })
          .then(function (footTypeFamily) {
            var species = _.flattenDeep(_.map(footTypeFamily.related('groups').toArray(), function(group) {
              return _.map(group.related('subgroups').toArray(), function(subgroup) {
                return subgroup.related('species').toArray();
              });
            }));
            reply({
              species: _.map(species, presentSpecie)
            }).code(200);
          })
    } else {
      Specie
          .fetchAll()
          .then(function(collection) {
            reply({
              species: collection.map(presentSpecie)
            }).code(200);
          });
    }
  }
};

module.exports = [
  read
];