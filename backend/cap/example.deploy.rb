##################################################
# Setup project
set :application, ""

set :username, ""
set :server, "vsa-nyzida.cyon.net"


# Local db details
set :local_db_host, ""
set :local_db_name, ""
set :local_db_prefix, "" #leave empty if there is no prefix
set :local_db_user, "root"
set :local_db_password, "'root'"

# Asset configuration
set :asset_folder, "media"


##################################################
# You shouldn't have to change anything below this
##################################################

# Setup URLs and paths
set :repo_url, "git@bitbucket.org:hi-schweiz/#{fetch(:application)}.git"
set :root_dir, "/home/#{fetch(:username)}"
set :tmp_dir, "#{fetch(:root_dir)}/tmp_capistrano"
set :public_html_dir, "#{fetch(:root_dir)}/public_html"

# Setup Capistrano
set :log_level, :info
set :use_sudo, false
set :deploy_as, 'user:group'

set :ssh_options, {
	forward_agent: true
}

set :keep_releases, 5
set :keep_db_backups, 10


namespace :deploy do

    desc "Confirm production deploy"
    task :confirm_production do
        if fetch(:env) == 'production'
          ask :confirm, "You are going to deploy to the PRODUCTION server. Continue? y/n"
          on roles(:all) do |h|
            if fetch(:confirm) != 'y'
                if fetch(:confirm) != 'yes'
                    puts "\nDeploy aborted"
                    exit
                end
            end
         end
      end
    end

	before :starting, :confirm_production
	desc "Creates robots.txt for non-production envs"
	task :create_robots do
		on roles(:web) do
			if fetch(:env) != 'production' then
                io = StringIO.new("User-agent: *\nDisallow: /")
				upload! io, File.join(release_path, "backend/craft/web/robots.txt")
				execute :chmod, "644 #{release_path}/backend/craft/web/robots.txt"
			end
		end
	end
	after :finished, :create_robots

    desc "setup and install craft"
	task :craft_all do
		invoke 'craft:install_composer'
		invoke 'craft:composer_packages'
        invoke 'craft:env_file'
        invoke 'craft:htaccess'
        invoke 'craft:permissions'
        invoke 'craft:clear_template_cache'
        invoke 'db:backup_folders'
	end
    after :finished, :craft_all

    desc "create symlinks"
    task :symlink do
        on roles(:web) do
            execute "ln -nfs #{current_path} #{fetch(:public_html_dir)}/#{fetch(:stage)}"
            execute "ln -nfs #{shared_path}/#{fetch(:asset_folder)} #{current_path}/backend/craft/web/#{fetch(:asset_folder)}"
        end
    end
    after :finished, :symlink


	after :finishing, "deploy:cleanup"
end
