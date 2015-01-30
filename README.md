## COA001

* PLEASE DO NOT USE THIS REPOs GITHUB CLONE FOLDER, as the Vagrantfile here is different from the one this special box uses.
* DO NOT RUN THIS SCRIPTS LIKE SO sh davecmds.sh, run them individual
Download the base box from dropbox, this box has a ypreconfigured env (Vagrantfile, private key, loaded postGRES DB) into COADB
400MB
https://www.dropbox.com/s/batwigad7b6uucx/COA001.box

### MAIN INSTRUCTIONS
* If this not your first time trying this, remove the box and all of it’s contents off of your system, `vagrant destroy -f`, use the virtualbox GUI to double check,
Remove the folder as well
```sh
#Create a new directory called COA001DB,
mkdir COA001DB
wget https://www.dropbox.com/s/batwigad7b6uucx/COA001.box
vagrant box add COA001 COA001.box
vagrant init
vi Vagrantfile
#Add COA001 as the base box, change line 15 to
#Line 15  config.vm.box = "COA001"
# Add the insecure vagrant key
# To this path, in the COA001DB folder,
#.vagrant/machines/default/virtualbox/
vagrant up
```
To config PG Commander


![Config Settings](/src/img/Screen%20Shot%202015-01-29%20at%203.20.57%20PM.png)

The password for postgres, is `postgres`

Replace TEST with your directory name, like the line below this one.

The private key is in the install directories, `~/COA001DB/.vagrant/machines/default/virtualbox/private_key` folder

Open up, an issue if have any problems.



Untested. Please do not attempt at this moment. These are for the DevOps team.
Manual instructions for manual replication of the stack, after Ansible provisioning, see development.yml for more info

```sh
#In the repo folder,
vagrant up
vagrant ssh
cd /var/www/
sudo wget https://www.dropbox.com/s/yrmnhekuumpxn8l/data_entry_production.sql
sudo -u postgres psql postgres
#you are in the psql console
\password postgres
postgres
postgres
\q
#you are out
sudo -i -u postgres
psql -d COA001 -f data_entry_production.sql
```
