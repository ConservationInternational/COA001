# Database

The database is based heavily on the [Knex][0] query builder.

## Migrations

`npm db:drop` - based on `node util.js drop`.  Drops the current database, depending on the `NODE_ENV` and the `knexfile.js`

`npm db:create` - based on `node util.js create`.  Creates the current database, depending on the `NODE_ENV` and the `knexfile.js`

`npm db:migrate` - based on `knex migrate:latest —knexfile src/db/knexfile.js`.  Migrates all migrations in `/migrations`.

`npm db:reset` - Drops the database, creates the database, migrates the database.

All database scripts should be run from the root of this repository, since they may reference the path to the `knexfile.js`.  `NODE_ENV` defaults to `development`.  If you wish to specify something else, here’s an example:

`NODE_ENV=test npm run db:reset`

## Organization

- `bookshelf.js` - Bookshelf and Knex initialization
- `knexfile.js` - all configs (development, test, staging, production, etc) for Knex.
- `migrations` - Where all of the Knex migrations are stored.  Currently run migrations are stored in the `knex_migrations` table.
- `util.js` - Utilities for database management.  Contains functionality to drop and create databases (Knex doesn’t include this as part of their migration tools, so these are hardcoded with raw SQL statements).

[0]: http://knexjs.org/
[1]: http://bookshelfjs.org/