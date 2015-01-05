// common dependencies
var fs = require('fs');
var url = require('url');
var colors = require('colors');
var debug = require('debug')('express-passport-app:setup');
var util = require('util');

// express dependencies
var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var flash = require('express-flash');

// socket.io dependecies
var socketHandshake = require('socket.io-handshake');

// configure express
module.exports.createExpressApp = function(options) {
    if (!options.session) throw (new Error('missing session middleware'));
    if (!options.store) throw (new Error('missing session store'));
    if (!options.dir) throw (new Error('missing root dir'));
    if (!options.static) throw (new Error('missing static dir reference'));
    if (!options.favicon) throw (new Error('missing favicon reference'));
    if (!options.views) throw (new Error('missing viewdir reference'));

    options.env = options.env || 'development';
    
    var app = express();

    // set view engine and parsers
    app.set('views', options.dir + options.views);
    app.set('view engine', 'html');
    app.engine('.html', options.handlebars.__express);
    app.set('json spaces', 2);

    // express common config
    app.use(compress());
    app.use(express.static(options.dir + options.static));
    app.use(morgan('dev'));
    app.use(options.cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(options.session({
        secret: options.sessionSecret,
        store: options.store,
        name: options.sessionKey,
        resave: true,
        saveUninitialized: true
    }));

    app.use(options.passport.initialize());
    app.use(options.passport.session());
    app.use(flash());

    // handle session store disconnect
    app.use(function(req, res, next) {
        if (!req.session) {
            return next(new Error('session store not available'));
        }
        next();
    });

    app.use(favicon(options.dir + options.favicon));

    // express dev config
    if ('development' == options.env) {
        app.use(errorHandler());
    }

    return app;
};

// handle express errors
module.exports.handleExpressError = function(app) {
    // handle 404 not found
    app.use(function(req, res, next) {
        res.status(404);

        // respond with html page
        if (req.accepts('html')) {
            res.render('404', {
                url: req.url
            });
            return;
        }

        // respond with json
        if (req.accepts('json')) {
            res.send({
                error: 'Not found'
            });
            return;
        }

        // default to plain-text. send()
        res.type('txt').send('Not found');
    });

    // handling other errors
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
};

// register handlebars partials
module.exports.registerPartials = function(path, handlebars) {
    var partials = path;
    fs.readdirSync(partials).forEach(function(folder) {
        var extension = folder.split('.')[1];
        if (extension != undefined) return;
        fs.readdirSync(partials + folder).forEach(function(file) {
            var extension = file.split('.')[1];
            if (extension != 'html') return;
            var source = fs.readFileSync(partials + folder + '/' + file, "utf8");
            var partial = folder + '-' + file.split('.')[0];
            handlebars.registerPartial(partial, source);
        });
    });
};

// register handlebars block helpers
module.exports.registerHelpers = function(helpers, handlebars) {
    for (var helper in helpers) {
        if (helpers.hasOwnProperty(helper)) {
            handlebars.registerHelper(helper, helpers[helper]);
        }
    }
    return;
};

// configure socket.io
module.exports.configureSockets = function(io, options) {
    io.use(socketHandshake({
        store: options.sessionStore,
        key: options.sessionKey,
        secret: options.sessionSecret,
        parser: options.cookieParser()
    }));
};

// create session store
module.exports.sessions = function(options) {
    var authObject;

    if ('production' == options.env) {
        var parsedUrl = url.parse(options.url);
        
        authObject = {
            prefix: options.prefix,
            host: parsedUrl.hostname,
            port: parsedUrl.port,
            db: options.db,
            pass: parsedUrl.auth ? parsedUrl.auth.split(":")[1] : null,
            secret: options.secret
        };

        return new options.Store(authObject);
    } else {
        return (new options.session.MemoryStore());
    }
};

// connect to backend store (db)
module.exports.connectToDatabase = function(mongoose, urlString) {
    function connect() {
        mongoose.connect(urlString);
    }

    // connection is open and ready
    mongoose.connection.on('open', function(ref) {
        debug('open connection to mongo server.');
    });

    // mongoose is connected to server
    mongoose.connection.on('connected', function(ref) {
        debug('connected to mongo server.');
    });

    // mongoose has disconnected
    mongoose.connection.on('disconnected', function(ref) {
        debug('disconnected from mongo server.');

        debug('retrying connection in 2 seconds..');
        setTimeout(function() {
            connect();
        }.bind(this), 2000);
    });

    // mongoose connection has closed
    mongoose.connection.on('close', function(ref) {
        debug('closed connection to mongo server');
    });

    // error has occured for mongoose connection
    mongoose.connection.on('error', function(err) {
        debug('error connection to mongo server!');
        debug(err);
    });

    // mongoose is reconnecting
    mongoose.connection.on('reconnect', function(ref) {
        debug('reconnect to mongo server.');
    });

    // initial connect
    connect();
};

// run application
module.exports.run = function(server, config) {
    server.listen(config.get('server.port'), function() {
        debug('listening on port %d'.green, server.address().port);
    });
};
