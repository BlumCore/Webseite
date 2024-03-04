# Define staging server
set :username, "username"
set :server, "vsa-nyzida.cyon.net"

set :primary_site_url, "https://username.hi-lab.ch"

set :env, "staging"
set :branch, "master"

set :db_host, "localhost"
set :db_password, "'password'"
set :db_prefix, "" #leave empty if there is no prefix
set :db_name, "username_staging" #default from cyon
set :db_user, "username_staging" #default from cyon

##################################################
# You shouldn't have to change anything below this
##################################################
server fetch(:server), user: fetch(:username), roles: %w{web}

set :deploy_to, "#{fetch(:root_dir)}/#{fetch(:stage)}"
