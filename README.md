# COA001
COASST dynamic website

## Documents

[Legacy database schema][4] - schema for the legacy website.  
[Volunteer wireframes][5] - wireframes that walk through all volunteer flows

## Technologies

[RSpec][0] for testing  
[Factory Girl][3] for creating test objects  
[Bootstrap][1] and [rails-bootstrap-forms][2] for visual styling  

## Structure

Contexts

## Devops

```
vagrant up

# bind your local port 5432 to the vagrant box's port 5432
ssh -L 5432:localhost:5432 vagrant@localhost -p 2227 -i .vagrant/machines/default/virtualbox/private_key
```

[0]: https://github.com/rspec/rspec-rails
[1]: http://getbootstrap.com/
[2]: https://github.com/bootstrap-ruby/rails-bootstrap-forms
[3]: https://github.com/thoughtbot/factory_girl

[4]: https://www.lucidchart.com/documents/edit/e8981e93-15e4-4bc4-880d-1a0b307d0ad4/0
[5]: https://www.lucidchart.com/documents/edit/98ab6ed2-909a-4b9b-b524-3cb97d32b2ea/0
