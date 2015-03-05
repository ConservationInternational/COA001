## COA001

### MAIN INSTRUCTIONS
* If this not your first time trying this, remove the box and all of it’s contents off of your system, `vagrant destroy -f`, use the virtualbox GUI to double check,
Remove your original COA001 folder as well, start from nothing to go forward.

## DevOps COA001 box provisioning

### Start here
```sh
#Clone this repo
git clone https://github.com/RadishLab/COA001.git
#THIS WILL TAKE 5-20 MINUTES. WE HAVE INSTALL AN OS, DOWNLOAD & IMPORT A DB, patience young jedi?
vagrant up
#You can update your host file now to 192.168.50.211 coa001.staging.radishlab.com while you are waiting
#Get into the machine, and run the npm commands in SETUP (below)
vagrant ssh
cd /var/www/
```
#### COASST Back End API

### Setup

After cloning run `sudo npm install` to install necessary node modules

`npm start` will start the server in development mode

### Testing

`npm test` runs all tests

`NODE_ENV=test mocha path/to/file.test.js` to run a specific test file

### Organization

- `devops` - provision of Vagrant boxes, and other fun stuff to get your local environment working
- `src` - Source code
  - `contexts` - Domain specific code.  Where the meat of the project is.  Dependent on the model/db layer.  Inspired by [DCI][0]
  - `db` - Database related files.  We use [Bookshelf][1] as an ORM, which is based on [Knex][2] as a query builder.  Migrations are contained here
  - `models` - Model code.  These are all [Bookshelf][1] models
  - `server` - Server code.  We use [Hapi][3].  Dependent on the contexts.  Code for server configuration, route configuration, API validation, etc.
  - `test` - Test code.  Based on [Mocha][4] and [Chai][5].

### COASST Front End Path /
```nginx
  root /var/www/frontend/app;
```
```sh
#locally
sudo mkdir frontend
cd frontend
git clone https://github.com/RadishLab/COA001-2.git app
```

### API Path /api
```nginx
  location /api {
    proxy_pass          http://127.0.0.1:3000;
```

[0]: http://www.wikiwand.com/en/Data,_context_and_interaction
[1]: http://bookshelfjs.org/
[2]: http://knexjs.org/
[3]: http://hapijs.com/
[4]: http://mochajs.org/
[5]: http://chaijs.com/

### Configuration for PG Commander

![Config Settings](/pg-commander.png)

The password for COA001, is `password`

The private key is in the install directories, `~/COA001/.vagrant/machines/default/virtualbox/private_key` folder

Open up, an issue if have any problems.
