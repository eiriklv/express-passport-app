Express 4.x application with Passport authentication
====================================================

#### Built with:
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

#### Dependencies:
* [mongodb](http://www.mongodb.org/)
* [redis](http://redis.io/)

#### Social logins supported:
* [facebook](http://developers.facebook.com/)
* [google+](http://developers.google.com/+/)
* [instagram](http://instagram.com/developer/)
 * (only by linking - as Instagram might not supply a valid email for registration)

#### Install dependencies (some might need to use `sudo` for various reasons): ###
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
* `SERVICE_NAME` - The name of your fantastic service/platform!
* `DEBUG` - Debugging (* for all)
* `NODE_ENV` - Environment ('development', 'staging', 'production')
* `CLIENT_API_URL` - Path to the client REST api (root - as resources should be relative)
* `MONGO_URL` - MongoDB url (including authentication)
* `REDIS_URL` - Redis url (including authentication)
* `REDIS_DB` - Redis database number
* `REDIS_SESSION_PREFIX` - Prefix for redis session entries
* `APPSECRET` - Application session secret
* `FACEBOOK_CLIENT_ID` - Facebook application client id
* `FACEBOOK_CLIENT_SECRET` - Facebook application client secret
* `FACEBOOK_CALLBACK_URL` - Facebook application callback url (http://yourdomain.com/auth/facebook/callback)
* `GOOGLE_CLIENT_ID` - Google application client id
* `GOOGLE_CLIENT_SECRET` - Google application client secret
* `GOOGLE_CALLBACK_URL` - Google application callback url (http://yourdomain.com/auth/google/callback)
* `INSTAGRAM_CLIENT_ID` - Instagram application client id
* `INSTAGRAM_CLIENT_SECRET` - Instagram application client secret
* `INSTAGRAM_CALLBACK_URL` - Instagram application callback url (http://yourdomain.com/auth/instagram/callback)
* `MANDRILL_API_KEY` - Mandrill API key
* `MANDRILL_SENDER` - Mandrill email sender address (John Doe &lt;john@doe.com&gt;)
* `EMAIL_VERIFICATION_ROUTE` - Email verification route (http://yourdomain.com/auth/local/verify)

#### Run the application:
* `gulp`
* navigate your browser to `http://localhost:3000` (or whatever port you chose for `PORT`)

#### TODO
* replace jquery with [react](http://facebook.github.io/react/) or [mithril](http://lhorie.github.io/mithril/)
* build simple client side example with the selected framework