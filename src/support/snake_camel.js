var _ = require('lodash');

module.exports = {
  snakeCaseObject: function(object) {
    return _.reduce(object, function(memo, val, key) {
      memo[_.snakeCase(key)] = val;
      return memo;
    }, {});
  },

  camelCaseObject: function(object) {
    return _.reduce(object, function(memo, val, key) {
      memo[_.camelCase(key)] = val;
      return memo;
    }, {});
  }
};
