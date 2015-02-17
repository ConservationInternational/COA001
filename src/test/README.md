# Testing

`nom test` runs all tests

Tests are based on:
- [Mocha][0] for the general testing library
- [Chai][1] for expectations (with some plugins for dealing with things like Promises)

TODO make tests work for single examples, and then document how to do so

## Organization

Actual test files should be organized based on how the file being tested is arranged related to the `/src` directory.  For example, look at how there is a `/models` directory and a `/server` directory and a `/contexts` directory.  If any of the source files are nested even more, the test file would be as well.

- `database_helper.js` - Contains helpers to deal with isolating tests that hit the database.  `#truncate` will truncate a specified table, using a raw Knex SQL statement.  Using Mocha’s `#beforeEach` and `#after` statement, all tables are truncated before each example, and after all examples, in order to guarantee a fresh start for every test.
- `test_helper.js` - Contains helpers for general testing.  This should be the only file you need to require for general utilities (ex: using promises in Chai expectations).  The pattern is to require `test_helper.js` like so:

```
var I = require(‘test_helper.js’);

I.expect(4).to.eql(4);
I.Promise…
I.request… 
```

By naming the variable `I`, calling into the exported libraries will still read like English.