// dependencies
var http = require('http');
// var mongoose = require('mongoose');
var sequelize = require('./database/sequelize.js');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var cookieParser = require('cookie-parser');
var handlebars = require('hbs');
var passport = require('passport');
var socketio = require('socket.io')();

// config and setup helpers
var helpers = require('helpers');
var config = require('config');
var setup = require('./setup');

// setup session store
var sessionStore = setup.sessions({
    cookieParser: cookieParser,
    env: config.get('env'),
    Store: RedisStore,
    session: session,
    url: config.get('database.redis.url'),
    prefix: config.get('database.redis.session.prefix'),
    db: config.get('database.redis.db'),
    secret: config.get('server.secret')
});

// create/configure express app
var app = setup.createExpressApp({
    passport: passport,
    handlebars: handlebars,
    cookieParser: cookieParser,
    session: session,
    store: sessionStore,
    sessionKey: config.get('session.key'),
    sessionSecret: config.get('server.secret'),
    dir: __dirname,
    static: '/client/public',
    favicon: '/client/public/images/favicon.ico',
    views: '/views',
    env: config.get('env')
});

// mail module
var mailer = require('modules/mailer')({
    env: config.get('env'),
    serviceName: config.get('service.name'),
    apiKey: config.get('mandrill.api.key'),
    senderAddress: config.get('mandrill.sender'),
    verificationRoute: config.get('email.verification.route')
});

// http and socket.io server(s)
var server = http.createServer(app);
var io = socketio.attach(server);

// app dependencies (app specific)
var ipc = require('modules/ipc')(0);
// var models = require('./models')(mongoose);
var models = require('./models')(sequelize);
var services = require('./services')(models);
var handlers = require('./handlers')(passport, services);
var authentication = require('modules/authentication')(models, mailer);

// setup application
// setup.connectToDatabase(mongoose, config.get('database.mongo.url'));
setup.registerPartials('./views/partials/', handlebars);
setup.registerHelpers(helpers.handlebars, handlebars);

// configure socket.io
setup.configureSockets(io, {
    cookieParser: cookieParser,
    sessionStore: sessionStore,
    sessionKey: config.get('session.key'),
    sessionSecret: config.get('server.secret')
});

// app specific modules
require('modules/sockets')(io, ipc);
require('modules/passport')(passport, authentication, models);
require('./routes')(app, handlers);

// express error handling
setup.handleExpressError(app);

// run application
setup.run(server, config.get('server.port'));
