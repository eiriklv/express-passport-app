// common dependencies
var fs = require('fs');
var url = require('url');
var colors = require('colors');
var debug = require('debug')('express-passport-app:setup');
var util = require('util')

// express dependencies
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var flash = require('express-flash');

// configure express
module.exports.configureExpress = function(options, app, config) {
    // set view engine and parsers
    app.set('views', options.dir + '/views');
    app.set('view engine', 'html');
    app.engine('.html', options.handlebars.__express);
    app.set('json spaces', 2);

    // express common config
    app.use(compress());
    app.use(options.express.static(options.dir + '/client/public'));
    app.use(morgan('dev'));
    app.use(options.cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(options.session({
        secret: config.get('server.secret'),
        store: options.store,
        name: config.get('session.key'),
        resave: true,
        saveUninitialized: true
    }));
    app.use(options.passport.initialize());
    app.use(options.passport.session());
    app.use(flash());
    app.use(favicon(options.dir + '/client/public/favicon.ico'));

    // handle when session store disconnects
    app.use(function(req, res, next) {
        if (!req.session) {
            return next(new Error('session store not available')) // handle error
        }
        next();
    });

    // express dev config
    if ('development' == config.get('env')) {
        app.use(errorHandler());
    }
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

// create session store
module.exports.sessions = function (SessionStore, session, config) {
    var authObject;

    if (config.get('env') == 'production') {
        var parsedUrl = url.parse(config.get('database.redis.url'));
        authObject = {
            prefix: config.get('database.redis.prefix'),
            host: parsedUrl.hostname,
            port: parsedUrl.port,
            db: config.get('database.redis.db'),
            pass: parsedUrl.auth ? parsedUrl.auth.split(":")[1] : null,
            secret: config.get('server.secret')
        };

        return new SessionStore(authObject);
    } else {
        return (new session.MemoryStore());
    }
};

// connect to backend store (db)
module.exports.db = function(mongoose, config) {
    function connect() {
        mongoose.connect(config.get('database.mongo.url'));
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
