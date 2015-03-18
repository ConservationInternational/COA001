var Hapi = require('hapi');
var Good = require('good');
var HapiAuthJwt = require('hapi-auth-jwt');
var Jwt = require('../support/jwt');
var _ = require('lodash');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply('Hello, world!');
  }
});

// Configure all routes
publicRoutes = [];
publicRoutes.push(require('./routes/users'));
publicRoutes.push(require('./routes/auth'));
publicRoutes.push(require('./routes/foot_type_families'));
publicRoutes.push(require('./routes/species'));
_.flatten(publicRoutes).forEach(function(route) {
  server.route(route);
});

privateRoutes = [];
privateRoutes.push(require('./routes/birds'));
server.register({
  register: HapiAuthJwt
}, function(err) {
  if (err) {
    throw err;
  }

  server.auth.strategy('token', 'jwt', {
    key: Jwt.privateKey,
    validateFunc: Jwt.validateToken
  });

  _.flatten(privateRoutes).forEach(function(route) {
    route.config = {
      auth: 'token'
    };
    server.route(route);
  });
});


server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      args:[{ log: '*', response: '*' }]
    }]
  }
}, function(err) {
  if (err) {
    throw err;
  }

  server.start(function() {
    server.log('info', 'Server running at: ', server.info.uri);
  });
})

module.exports = server;
