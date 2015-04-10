# Stack
Angular and Sass Frontend, Django Backend, Deployment via Heroku

# Development Setup
Code Wukong uses npm and bower and develops on a kubuntu virtual machine with git GUI via netbeans

1. ##### *How to install npm via nvm*
  ###### Download nvm
         wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.24.1/install.sh | bash  
  ###### Find the latest version and install
         nvm ls-remote  
         nvm install 0.12.2 (0.12.2 is the latest version at time of writing)  
  ###### Verify node is installed and set default version
         node --version  
         nvm alias default stable  

2. ##### *How to install grunt*
  ###### Install globally
         npm install -g grunt-cli

3. ##### *Get the dev dependencies for this project*
  ###### from the root directory of this project
         cp frontend/config/package.json package.json
         npm install  
         npm install -g bower  
         bower install  

4. ##### *Create a .env file with the following in the root project directory*
         ENV_ROLE=development  
         SECRET_KEY=local  
         DJANGO_STATIC_HOST={{your cloudfront url*}}   
         SITE_STATUS_FLAG=1    
  *[see this guide on settings up a cloudfront url](https://whitenoise.readthedocs.org/en/latest/django.html#use-a-content-delivery-network-optional)

5. ##### *You will also need a virtualenv*
  ###### from the root directory of this project
          virtualenv venv  
          source /venv/bin/activate  
          (venv) pip install -r requirements.txt  

6. ##### *Install Ruby and Sass*
  ###### Check if you have sass
          sass -v  
  ###### if not, do
        sudo gem install sass  
  ###### Check if you have ruby
          ruby -v  
  ###### if not, do
          sudo apt-get install ruby

## Notes
###### To sass compile, concat, and minify all css/js run the following:   
    (venv) grunt watch:{{app_name}}:dev
###### To run the django server and watch for changes run the following:
    (venv) python manage.py runserver