Express 4.x application with Passport authentication
====================================================

### Built with: ###
* node.js
* express
* passport
* gulp
* browserify
* handlebars
* socket.io
* stylus + nib
* convict

### Social logins supported: ###
* Facebook
* Google+
* Instagram (only by linking - as Instagram might not supply a valid email for registration)

### Install dependecies (some might need to use `sudo` for various reasons): ###
* `npm install -g gulp`
* `npm install`
* set your config in `dev.sh`

### Create an application on both Facebook, Google+ and Instagram and point the callbacks to (respectively) ###
* `http://localhost:3000/auth/facebook/callback`
* `http://localhost:3000/auth/google/callback`
* `http://localhost:3000/auth/instagram/callback`

### Email verification via Mandrill
* Create an application on Mandrill
* set env var EMAIL_VERIFICATION_ROUTE to `http://localhost:3000/auth/local/verify`

### Run the application: ###
* `sh dev.sh`
* navigate your browser to `http://localhost:3000` (or whatever port you chose in `dev.sh`)