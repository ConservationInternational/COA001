#COA001

Create a new directory called COA001DB, PLEASE DO NOT USE THIS FOLDER, as the Vagrantfile here is different from the one this special box uses.

Download the base box from dropbox, this box has a preconfigured env (Vagrantfile, private key, loaded postGRES DB)
400MB
https://www.dropbox.com/s/batwigad7b6uucx/COA001.box


```sh
mkdir COA001DB
vagrant box add COA001 COA001.box 
vagrant init
vagrant up
```
Config PG Commander


![Config Settings](/src/img/Screen%Shot%2015-01-29%at%3.20.57%PM.png)

The password for postgres, is `postgres`

The private key is in the install directories, `.vagrant/machines/default/virtualbox/private_key` folder

Open up, an issue if have any problems.

Manual instructions for manual replication of the stack, after Ansible provisioning, see development.yml for more info

```sh
cd /var/www/
sudo wget https://www.dropbox.com/s/yrmnhekuumpxn8l/data_entry_production.sql?dl=://www.dropbox.com/s/yrmnhekuumpxn8l/data_entry_production.sql
sudo -u postgres psql postgres
\password postgres
postgres
postgres
\q
sudo -i -u postgres
psql -d COA001 -f data_entry_production.sql
```
