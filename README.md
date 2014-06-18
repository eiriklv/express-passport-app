Express 4.x application with Passport authentication
====================================================

[![Build Status](https://travis-ci.org/eiriklv/express-passport-app.svg?branch=master)](https://travis-ci.org/eiriklv/express-passport-app)
[![Coverage Status](https://coveralls.io/repos/eiriklv/express-passport-app/badge.png)](https://coveralls.io/r/eiriklv/express-passport-app)
[![Dependency Status](https://david-dm.org/eiriklv/express-passport-app.svg)](https://david-dm.org/eiriklv/express-passport-app)

![express passport application](http://s29.postimg.org/6zbwl1fnb/preview.png "Express Passport Application")

#### Built with
* [node.js](http://www.nodejs.org/)
* [express](http://www.expressjs.com/)
* [passport](http://www.passportjs.org/)
* [gulp](http://www.gulpjs.com/)
* [socket.io](http://www.socket.io/)
* [convict](http://github.com/mozilla/node-convict/)
* [browserify](http://www.browserify.org/)
 * [hbsfy](http://github.com/epeli/node-hbsfy/)
 * [envify](http://github.com/hughsk/envify/)
* [handlebars](http://handlebarsjs.com/)
* [stylus](http://learnboost.github.io/stylus/)
 * [nib](http://visionmedia.github.io/nib/)
* [bootstrap](http://getbootstrap.com/)
* [fontawesome](http://fortawesome.github.io/Font-Awesome/)
* [jquery](http://www.jquery.com/)

#### Testing
* [mocha](http://visionmedia.github.io/mocha/)
* [chai](http://chaijs.com/)
* [sinon](http://sinonjs.org/)

#### Dependencies
* [mongodb](http://www.mongodb.org/)
* [redis](http://redis.io/)

#### Social logins supported
* [facebook](http://developers.facebook.com/)
* [google+](http://developers.google.com/+/)
* [instagram](http://instagram.com/developer/)
 * (only by linking - as Instagram might not supply a valid email for registration)

#### Install dependencies (some might need to use `sudo` for various reasons)
* `brew/apt-get install redis`
* `brew/apt-get install mongodb`
* `npm install -g mocha`
* `npm install -g gulp`
* `npm install`

#### Create an application on both Facebook, Google+ and Instagram and point the callbacks to (respectively)
* `http://localhost:3000/auth/facebook/callback`
* `http://localhost:3000/auth/google/callback`
* `http://localhost:3000/auth/instagram/callback`

#### Email verification via Mandrill
* Create an application on [mandrill](http://mandrill.com/)

#### Set environment variables
* `PORT` - Port exposed by this component.
 * example: `3000`
* `SERVICE_NAME` - The name of your fantastic service/platform!
 * example: `Express Passport Application`
* `DEBUG` - Debug output (* for all) (optional)
 * example: `*`
* `NODE_ENV` - Environment ('development', 'staging', 'production')
 * example: `development`
* `CLIENT_API_PATH` - Path to the client REST api (relative)
 * example: `/api`
* `MONGO_URL` - MongoDB url (including authentication)
 * example: `mongodb://user:pass@localhost:27017/mydatabase`
* `REDIS_URL` - Redis url (including authentication)
 * example: `redis://user:pass@localhost:6379`
* `REDIS_DB` - Redis database number (optional)
 * example: `1`
* `REDIS_SESSION_PREFIX` - Prefix for redis session entries (optional)
 * example: `sess:`
* `APPSECRET` - Application session secret
 * example: `sOmeCrAzYhAsH894372`
* `SESSION_KEY` - Application session secret (optional)
 * example: `express.sid` (default to `connect.sid`)
* `FACEBOOK_CLIENT_ID` - Facebook application client id
 * example: `abcdefghijklmnopqrstuvxyz1234567890`
* `FACEBOOK_CLIENT_SECRET` - Facebook application client secret
 * example: `abcdefghijklmnopqrstuvxyz1234567890`
* `FACEBOOK_CALLBACK_URL` - Facebook application callback url
 * example: `http://yourdomain.com/auth/facebook/callback`
* `GOOGLE_CLIENT_ID` - Google application client id
 * example: `abcdefghijklmnopqrstuvxyz1234567890`
* `GOOGLE_CLIENT_SECRET` - Google application client secret
 * example: `abcdefghijklmnopqrstuvxyz1234567890`
* `GOOGLE_CALLBACK_URL` - Google application callback url
 * example: `http://yourdomain.com/auth/google/callback`
* `INSTAGRAM_CLIENT_ID` - Instagram application client id
 * example: `abcdefghijklmnopqrstuvxyz1234567890`
* `INSTAGRAM_CLIENT_SECRET` - Instagram application client secret
 * example: `abcdefghijklmnopqrstuvxyz1234567890`
* `INSTAGRAM_CALLBACK_URL` - Instagram application callback url
 * example: `http://yourdomain.com/auth/instagram/callback`
* `MANDRILL_API_KEY` - Mandrill API key
 * example: `abcdefghijklmnopqrstuvxyz1234567890`
* `MANDRILL_SENDER` - Mandrill email sender address
 * example: `John Doe <john@doe.com>`
* `EMAIL_VERIFICATION_ROUTE` - Email verification route
 * example: `http://yourdomain.com/auth/local/verify`

#### Run tests
* `npm test`

#### Run the application
* `gulp`
* navigate your browser to `http://localhost:3000` (or whatever port you chose for `PORT`)

#### TODO
* upgrade to socket.io 1.x
* ~~continuous integration with [travis](http://www.travis-ci.org/)~~
* add test coverage with [coveralls.io](http://www.coveralls.io/)
* ~~add unit test framework~~
* add complete test suite
* replace jquery with [react](http://facebook.github.io/react/) or [mithril](http://lhorie.github.io/mithril/)
* build simple client side example with the selected framework