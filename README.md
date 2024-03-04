# HI Schweiz AG - Base Workspace

## Set up an initial project

1. `git clone git@bitbucket.org:hi-schweiz/hi-base-vite.git <projectname>` Clone the 'hi-base' into a new folder
2. `cd <projectname>` change into directory
3. `rm -rf .git` Remove hi-base .git folder and init new git repo with `git init`
4. `composer config platform.php 8.0.2 -d backend/craft` Update PHP version in composer.json to «8.0»
5. `composer install -d backend/craft` Install and composer packages
6. Create a host with MAMP Pro (`local.<projectname>`). Document root is `<projectname>/backend/craft/web`
7. Create a database with Sequel Pro on HI-Server
8. Create .env file with `cp backend/craft/.env.example  backend/craft/.env`
9. Setup Craft CMS with the db creds from HI-Server in CLI: `backend/craft/craft setup`. If setup fails start the
   installation with `local.<projectname>/index.php?p=admin/install` afterwards  (Site language = `de` / `de-CH`). When
   setting up craft in the browser, the `PRIMARY_SITE_URL` and the `DEV_SERVER` needs to be set in the .env file.
10. `composer update -d backend/craft` Update composer packages
11. Check if the @primarySiteUrl is set in the sites settings (Settings -> Websites)
12. Check if all plugins in the Craft dashboard (Settings -> Plug-ins) are installed and activated
13. `cd frontend` Go to frontend directory
14. `yarn install` Install dependencies
15. `yarn watch` or `yarn dev` to start coding after you initiated the continuous build process

## Setup (existing project)

1. `git clone` Clone the project repo
2. `cd <projectname>` change into directory
3. `composer install -d backend/craft` Install composer packages
4. Create a host with MAMP Pro (`local.<projectname>`). Document root is `<projectname>/backend/craft/web`
5.
    * *Setup Craft CMS with the db creds from HI-Server in CLI:* `backend/craft/craft setup` or create the .env file by
      hand and start the installation afterwards (Site language = `de`)
    * *Setup Craft CMS with the db creds from HI-Server in a browser:* `local.<projectname>/index.php?p=admin/install`
6. `composer config platform.php 8.0 -d backend/craft` Update PHP version in composer.json to «8.0»
7. Follow initial setup steps 11. – 14.

-----

## How to install a new vendor package (using the example of jQuery)

1. Add jQuery to the frontend folder with `yarn add jquery` (package gets downloaded to node_modules)
2. Import jQuery in the respective module and set "$" to belong to the window object: `import * as $ from 'jquery'`
3. You can now use jQuery syntax in this module 🎉 (import jQuery in every module where you need it).

-----

## Possible CLI commands in 'frontend'

* `yarn setup` -> Installs SASS, Yarn and Gulp
* `yarn update` -> Updates Brew, Yarn SASS and all package dependencies to the latest version
* `yarn install` -> Installs all package dependencies defined in package.json
* `yarn clean` -> Removes the dist folder
* `yarn dev` -> Starts the watch process
* `yarn build` -> Makes a production / staging ready build. Make this before every deploy

-----

## Possible CLI commands in 'backend'

Replace `<environment>` with `staging` or `production`

* `cap <environment> deploy` -> deploys latest repository to remote, installs craft and changes .env-file
* `cap <environment> deploy:rollback ROLLBACK_RELEASE=<RELEASEDATETIME>` -> deploys an older commit to remote, installs
  craft and changes .env-file
* `cap <environment> db:push` -> pushes db from local to remote
* `cap <environment> db:pull` -> pulls db from remote to local
* `cap <environment> db:backup` -> saves a backup from server to local db_backups-folder
* `cap <environment> craft:sync_media_l2r` -> sync media folder from local to remote
* `cap <environment> craft:sync_media_r2l` -> sync media folder from remote to local
* `cap <environment> craft:push` -> `db:push` + `craft:sync_media_l2r`
* `cap <environment> craft:pull` -> `db:pull` + `craft:sync_media_r2l`
* `cap <environment> revisions:show_current` -> shows currently live release
* `cap <environment> revisions:show_all` -> shows all released commits on server

-----

## Deployment

### Requirements

**Local machines public SSH key is added to Bitbucket Profile**

1. `pbcopy < ~/.ssh/id_ed25519.pub` Copy your public SSH key to the clipboard
2. On Bitbucket click on Avatar on the lower left -> Bitbucket settings -> SSH keys -> Add key -> paste

**Capistrano is installed locally**

1. `gem install capistrano`

**rsync is on version 3**

1. `brew install rsync` to install newest rsync version with Homebrew
2. Sign out and back in to MacOS
3. `rsync --version` see if version is above 3.1

### Deploy a project from local machine to server

1. Create a new account on [Cyon Agencyserver](https://my.cyon.ch/cloud-agency/account) with the *HI Space Light*
   package. Use main domain name and let 1Password generate a password.
2. Change to the newly created account and save username, server (vsa-nyzida.cyon.net) and password as a «Server» to
   1Password.
3. Create databases `<projectname>_staging` and `<projectname>_production` on my.cyon.ch (save server/user/password
   infos to 1Password)
4. Point domain to `production/backend/craft/web`
5. Create subdomain `staging.*` and point it to `staging/backend/craft/web`
6. Create new domain (not a subdomain) `<projectname>.hi-lab.ch` and add it to the `staging.*` subdomain
7. Change [PHP Settings](https://my.cyon.ch/tools/php/settings): Allow `proc_open` and `proc_close` and
   set `max_execution_time` to `120`
8. Copy example stages
   with `cp backend/cap/deploy/example.staging.rb backend/cap/deploy/staging.rb && cp backend/cap/deploy/example.production.rb backend/cap/deploy/production.rb`
9. Copy deploy.rb with `cp backend/cap/example.deploy.rb backend/cap/deploy.rb`
10. Set variables in `backend/cap/deploy.rb`
11. Set variables in `deploy/staging.rb` and `deploy/production.rb`
12. `ssh-copy-id -i ~/.ssh/id_ed25519 <xyz>@vsa-nyzida.cyon.net` copy my local ssh key to server
13. Make sure to have set the correct php version in the cyon [PHP Versions](https://my.cyon.ch/tools/php/versions) and [CMD](https://www.cyon.ch/support/a/php-standardversion-fur-die-kommandozeile-festlegen)  
14. Make a production build in the `frontend` directory with `yarn build` and commit it to the repo
15. `cd backend` Go to backend directory
16. `cap staging deploy` Deploy the current repository to the staging server
17. `cap staging craft:push` Push the local database and media folder to staging server

-----

## Backup

* Add [Cron Job](https://my.cyon.ch/tools/cron) like
  this: `59 23 * * 0 wget https://www.domain.ch/enupal-backup/schedule?key= -O /dev/null` (Every Sunday)

-----

## Coding standards

Please consult
the [HI Code Guideline](https://paper.dropbox.com/doc/Code-Guideline-HI-Schweiz-AG--AWIStQcA9GG94nZTu0kQt5zrAQ-zGDponjaeOUl17jwJNinq)
.

-----

## Project Checklist

### Content

- ☑ This is an already checked todolist item for copy paste purpose
- ☐ Check content (spelling, contact details, years, etc.)
- ☐ Favicons are stored and displayed correctly ([realfavicongenerator.net](https://realfavicongenerator.net))
- ☐ 404-Page available
- ☐ All links work ([W3C Link Checker](https://validator.w3.org/checklink))
- ☐ Delete test content and placeholders
- ☐ Forms are sent correctly
- ☐ HI Schweiz and involved parties are mentioned in the imprint (Impressum)
- ☐ Privacy policy (Datenschutzerklärung) available

### Markup & Rendering

- ☐ Unnecessary code (comments, console.logs, etc.) has been removed.
- ☐ [W3C Validator](https://validator.w3.org/) gives no errors
- ☐ External links with `target="_blank"` also have `rel="noopener"`

### Design & Browser Testing

- ☐ Works and is displayed correctly on all viewports (> 320px).
- ☐ Works and is displayed correctly in IE11
- ☐ Works and is displayed correctly in Microsoft Edge
- ☐ Works and is displayed correctly in Firefox
- ☐ Works and is displayed correctly in Chrome
- ☐ Works and is displayed correctly in Safari (Mac)
- ☐ Works and is displayed correctly in Safari (iOS)
- ☐ Works and is displayed correctly on Android Browser

### SEO

- ☐ Meta title (&lt; 65 characters) and meta description (&lt; 155 characters) available on all pages
- ☐ Check XML Sitemap with siteURL/sitemap.xml
- ☐ [robots.txt](https://support.google.com/webmasters/answer/6062596?hl=en) available
- ☐ 301 Redirects are set up after a redesign ([Redirect Manager Plugin](https://plugins.craftcms.com/redirect))
- ☐ Define [Open Graph Tags](http://ogp.me/) when page has sharing-options

### Accessibility

- ☐ Pictures have an alternative text `<img alt="...">`
- ☐ Touch targets are at least 48px × 48px

### CMS

- ☐ Check the Craft system report for non green checkmarks (`<projectname>/admin/utilities/system-report`) and
  change [PHP settings](https://my.cyon.ch/tools/php/settings) accordingly
- ☐ Make sure that Craft Pro and paid plugins like Neo and Linkit have a license. Licenses can be bought through the
  Control Panel itself.
- ☐ Add the used license.key and all paid plugins to our [Craft ID](https://id.craftcms.com/) (digital@hi-schweiz.ch)

### Performance

- ☐ SVGs are optimized ([SVGOMG](https://jakearchibald.github.io/svgomg))
- ☐ PNG and JPEG images are optimized
- ☐ PNG and JPEG images are displayed in the correct size
- ☐ CSS and Javascript are minified
- ☐ Integrated vendor code is minified
- ☐ Load Javascript at the end of the document or in the head
  with `defer` ([Infos](https://flaviocopes.com/javascript-async-defer/))
- ☐ Only required web fonts are used
- ☐ Website remains somewhat usable without
  Javascript ([Progressive Enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement))
- ☐ [Google Page Speed](https://developers.google.com/speed/pagespeed/insights/) is over 80/100

### After Go-Live

- ☐ Google Analytics is set up an in the markup
- ☐ Protect domain with SSL certificate. Set up forwarding to
  HTTPS. ([my.cyon.ch](https://my.cyon.ch/security/tlssimple))
- ☐ Add security headers to .htaccess and check [security score](https://securityheaders.com/).
- ☐ Update projekte.hi-schweiz.ch with all the information about the project.