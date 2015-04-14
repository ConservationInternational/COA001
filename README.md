# COA001
COASST dynamic website

## Getting Started

1. Clone this repo

2. Make sure you have the required version of ruby

`cat .ruby-version` will show the proper version of ruby to use

I suggest using [rvm][6] to manage different versions of ruby

3. Install dependencies

`bundle install`

4. Migrate the database

```
bundle exec rake db:drop db:create db:migrate
bundle exec rake db:seed
```

5. Start the server

```
bundle exec rails server
```

go to `http://localhost:3000/`

6. Run the tests

```
bundle exec rspec spec/
```

## Documents

[Legacy database schema][4] - schema for the legacy website.  
[Volunteer wireframes][5] - wireframes that walk through all volunteer flows

## Technologies

[RSpec][0] for testing  
[Factory Girl][3] for creating test objects  
[Bootstrap][1] and [rails-bootstrap-forms][2] for visual styling  

## Structure

Contexts are heavily used to provide a domain layer.  These are from [DCI][7].  While there are contexts in this app, there aren't any roles.  In the past I found the abstraction of roles to just make the code more confusing, and wasn't worth it.  However, contexts provide a nice layer where code can be easily tested, reusable, and composed.  Contexts are also a nice separation from the transport layer (HTTP, Rails Controllers) and the raw models (ActiveRecord models). The way contexts are used are somewhat similar to a [service layer][8]

Typically Rails apps will grow to either have fat models or fat controllers.  Our app will have very skinny models and controllers, and a lot of the logic will go into different contexts instead.  Our models will essentially just be responsible for storage (database interaction), and perhaps some additional properties (`full_name` as a method that joins a `first_name` and `last_name` property).  Our controllers will only be responsible for calling into contexts.

The naming convention for contexts is to be a gerund.  For example `CreatingUser`, `Authenticating`, `DebitingBankAccount`.  Each context has a class method `.execute!` that is the entry point for calling into a context.  For example: `DebitingBankAccount.execute!(source, destination, 10.0)`.

## Devops

```
vagrant up

# bind your local port 5432 to the vagrant box's port 5432
ssh -L 5432:localhost:5432 vagrant@localhost -p 2227 -i .vagrant/machines/default/virtualbox/private_key

# ssh into the vagrant box
vagrant ssh

# psql into the database
sudo -iu postgres psql

# connect to the legacy database
\connect COA001

# list all tables
\dt

# connect to the development database
\connect coasst_development
```

[0]: https://github.com/rspec/rspec-rails
[1]: http://getbootstrap.com/
[2]: https://github.com/bootstrap-ruby/rails-bootstrap-forms
[3]: https://github.com/thoughtbot/factory_girl

[4]: https://www.lucidchart.com/documents/edit/e8981e93-15e4-4bc4-880d-1a0b307d0ad4/0
[5]: https://www.lucidchart.com/documents/edit/98ab6ed2-909a-4b9b-b524-3cb97d32b2ea/0

[6]: https://rvm.io/
[7]: http://www.wikiwand.com/en/Data,_context_and_interaction
[8]: https://blog.engineyard.com/2014/keeping-your-rails-controllers-dry-with-services
