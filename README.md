# Hand Strat

An application to manage tactical schema for hand ball team

## Developpement

#### Install the development environement :

```
npm install -g forever
npm install
gem install sass
```

#### Run the assets compilation in watch mode :

```
grunt
```

For a one time build, use ```grunt build```


#### Run the application

```
npm start
```

You're done, the application is available at [http://localhost:1337](http://localhost:1337)



## Architecture

Hand start is a [Sails.js])(http://sailsjs.org/#/) application.
The code structure is as follow :

```
/api              ## The backend part
  /controllers    
  /models         
  /policies       ## policies middleware, you can accesscontrol / pre fetch there
  /responses      ## Shortcup for HTTP Resosnse (like 200, 404 ...)
  /services       
/assets           ## All the assets
  /images         
  /js             ## JS files, only main.js will be browserifyed.
  /styles         ## CSS files, use Sass, only main.scss
  /templates      ## [disabled] Basic way from Sails.js to provide frontend template (in browser)
  /favicon.ico
  /robots.txt
/config           ## Sails configuration, cf [Sails.js])(http://sailsjs.org/#/)
  /env            ## Env specific configuration
  /locales        ## I18n
  ...
/tasks            ## Grunt config
  /config         ## One file per task configuration
  /register       ## Grunt target (like grunt "build")
  README.md
/views            ## Views, use EJS
app.js
Gruntfile.js
package.json
README.md
```
