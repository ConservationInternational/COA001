# COA001
COASST Backend API

## Setup

After cloning run `npm install` to install necessary node modules

`nom start` will start the server in development mode

## Testing 

`npm test` runs all tests

`NODE_ENV=test mocha path/to/file.test.js` to run a specific test file

## Organization

- `devops` - provision of Vagrant boxes, and other fun stuff to get your local environment working
- `src` - Source code
  - `contexts` - Domain specific code.  Where the meat of the project is.  Dependent on the model/db layer.  Inspired by [DCI][0]
  - `db` - Database related files.  We use [Bookshelf][1] as an ORM, which is based on [Knex][2] as a query builder.  Migrations are contained here
  - `models` - Model code.  These are all [Bookshelf][1] models
  - `server` - Server code.  We use [Hapi][3].  Dependent on the contexts.  Code for server configuration, route configuration, API validation, etc.
  - `test` - Test code.  Based on [Mocha][4] and [Chai][5].


[0]: http://www.wikiwand.com/en/Data,_context_and_interaction
[1]: http://bookshelfjs.org/
[2]: http://knexjs.org/
[3]: http://hapijs.com/
[4]: http://mochajs.org/
[5]: http://chaijs.com/
