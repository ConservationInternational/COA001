## COA001

* PLEASE DO NOT USE THIS REPO'S GITHUB CLONE FOLDER, as the Vagrantfile here is different from the one this special box uses.
* DO NOT RUN THIS SCRIPTS LIKE SO `sh davecmds.sh`, run them individually

Download the base box from dropbox, this box has a preconfigured env (Vagrantfile, private key, loaded postGRES DB) into COA001DB (400MB size)
https://www.dropbox.com/s/batwigad7b6uucx/COA001.box

### MAIN INSTRUCTIONS
* If this not your first time trying this, remove the box and all of it’s contents off of your system, `vagrant destroy -f`, use the virtualbox GUI to double check,
Remove your original COA001DB folder as well

```sh
# Create a new directory called COA001DB, and change into it
$ mkdir COA001DB
$ cd COA001DB

# Download the box file, via wget, or clicking the link, or what have you
$ wget https://www.dropbox.com/s/batwigad7b6uucx/COA001.box

# Add the box to vagrant
$ vagrant box add COA001 path/to/downloaded/box/COA001.box

# Initialize a Vagrantfile and edit line 15:
# 15: config.vm.box = "COA001"
$ vagrant init
$ vi Vagrantfile

# Boot the vagrant box
$ vagrant up

# Now, while the box is booting, it'll eventually start trying to auth with the
# following error:
# ==> default: Waiting for machine to boot. This may take a few minutes...
#   default: SSH address: 127.0.0.1:2227
#   default: SSH username: vagrant
#   default: SSH auth method: private key
#   default: Warning: Connection timeout. Retrying...
#   default: Warning: Authentication failure. Retrying...
#   default: Warning: Authentication failure. Retrying...
#   default: Warning: Authentication failure. Retrying...
#
# While this is happening, open a new terminal window and copy the private_key
# file from the COA001 git repository to the
# ./vagrant/machines/default/virtualbox/ folder (this is created by Vagrant after
# `vagrant up`)
$ cp path/to/COA001/repository/devops/private_key ./vagrant/machines/default/virtualbox/

# Now it should successfully authenticate
```
To config PG Commander


![Config Settings](/devops/pg-commander.png)

The password for postgres, is `postgres`

Replace TEST with your directory name, like the line below this one.

The private key is in the install directories, `~/COA001DB/.vagrant/machines/default/virtualbox/private_key` folder

Open up, an issue if have any problems.


# DevOps COA001 box provisioning

Untested. Please do not attempt at this moment. These are for the DevOps team.
Manual instructions for manual replication of the stack, after Ansible provisioning, see development.yml for more info

```sh
# In the repo folder,
$ vagrant up
$ vagrant ssh
$ cd /var/www/
$ sudo wget https://www.dropbox.com/s/yrmnhekuumpxn8l/data_entry_production.sql
$ sudo -u postgres psql postgres
# you are in the psql console
\password postgres
postgres
postgres
\q
# you are out
$ sudo -i -u postgres
$ psql -d COA001 -f data_entry_production.sql
```
