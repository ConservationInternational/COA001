var FootTypeFamily = require('../../models/init').FootTypeFamily
var SnakeCamel = require('../../support/snake_camel');

var read = {
  method: "GET",
  path: "/foot-type-families",
  handler: function(request, reply) {
    FootTypeFamily
        .fetchAll()
        .then(function(collection) {
          reply({
            foot_type_families: collection.map(function(model) {
              var json = SnakeCamel.snakeCaseObject(model.attributes);
              delete json.id;
              return json;
            })
          }).code(200);
        });
  }
};

module.exports = [
  read
];
