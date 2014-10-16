// dependencies
var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var cookieParser = require('cookie-parser');
var hbs = require('hbs');
var passport = require('passport');
var socketio = require('socket.io');
var SessionSockets = require('session.socket.io-express4');
var app = express();

// config and setup helpers
var helpers = require('./helpers')();
var config = require('./config');
var setup = require('./setup');

// setup session store
var sessionStore = setup.sessions(RedisStore, session, config);

// setup application
setup.db(mongoose, config);
setup.registerPartials('./views/partials/', hbs);
setup.registerHelpers(helpers.handlebars, hbs);

// configure express
setup.configureExpress({
    express: express,
    passport: passport,
    handlebars: hbs,
    session: session,
    store: sessionStore,
    cookieParser: cookieParser,
    dir: __dirname
}, app, config);

// http and socket.io server(s)
var server = http.createServer(app);
var io = socketio.listen(server);
var sessionSockets = new SessionSockets(io, sessionStore, cookieParser(), config.get('session.key'));

// app dependencies (app specific)
var ipc = require('./modules/ipc')(0);
var mailer = require('./modules/mailer')(config);
var models = require('./models')(mongoose, helpers.validators);
var services = require('./services')(models, helpers);
var handlers = require('./handlers')(passport, services, helpers);
var authentication = require('./modules/authentication')(models, mailer);

// app specific modules
require('./modules/sockets')(io, sessionSockets, ipc);
require('./modules/passport')(passport, config, authentication, models);
require('./routes')(app, express, handlers, config);

// express error handling
setup.handleExpressError(app);

// run application
setup.run(server, config);
