# Server

The server is based on [Hapi][0]

## Setup

`node hapi.js` will start the server, defaulting to development mode.

`NODE_ENV={ENVIRONMENT} node hapi.js` sets the proper environment to start up the server

## Organization

- `hapi.js` - The “main” file.  Sets up initialization and configuration of the Hapi server
- `routes` - Where all of the routes are defined.  These files set up the paths, route handling, and basic validation (based on Hapi’s [Joi][1] validator.  Otherwise, these routes are very basic wrappers around the contexts

[0]: http://hapijs.com/
[1]: https://github.com/hapijs/joi