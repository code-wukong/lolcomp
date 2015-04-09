# Stack
Angular and Sass Frontend, Django Backend, Deployment via Heroku

## Development Setup
We use npm and bower and develop on a kubuntu virtual machine with git GUI via netbeans

1. How to install npm via nvm
* Download nvm
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.24.1/install.sh | bash
* Find the latest version and install
nvm ls-remote
nvm install 0.12.2 (0.12.2 is the latest version at time of writing)
* Verify node is installed and set default version
node --version
nvm alias default stable

2. How to install grunt
* Install globally
npm install -g grunt-cli

3. Get the dev dependencies for this project
* from the root directory of this project
npm install
npm install -g bower
bower install

4. Create a .env file with the following in the root project directory
ENV_ROLE=development
SECRET_KEY=local
DJANGO_STATIC_HOST=/d117wggqwe1zl6.cloudfront.net
SITE_STATUS_FLAG=1

5. You will also need a virtualenv
* from the root directory of this project
virtualenv venv
source /venv/bin/activate
(venv) pip install -r requirements.txt
(venv) foreman start