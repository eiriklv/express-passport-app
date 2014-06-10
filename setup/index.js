// common dependencies
var fs = require('fs');
var url = require('url');
var colors = require('colors');
var debug = require('debug')('express-passport-app:setup');

// express dependencies
var morgan = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var flash = require('express-flash');

// configure express
module.exports.configureExpress = function (options, app, config) {
    // set view engine and parsers
    app.set('views', options.dir + '/views');
    app.set('view engine', 'html');
    app.engine('.html', options.handlebars.__express);

    // json pretty response
    app.set('json spaces', 2);

    // express common config
    app.use(options.express.static(options.dir + '/client/public')); // set the static files location /public/img will be /img for users
    app.use(morgan('dev')); // log every request to the console
    app.use(options.cookieParser()); // cookie parser
    app.use(bodyParser()); // pull information from html in POST
    app.use(methodOverride()); // simulate DELETE and PUT from '_method' in form
    app.use(options.session({ secret: config.get('server.secret'), store: options.store, key: config.get('session.key') })); // sessions
    app.use(options.passport.initialize()); // init passport
    app.use(options.passport.session()); // persistent login sessions
    app.use(flash()); // session flash messages (express-flash)
    app.use(favicon(options.dir + '/client/public/favicon.ico')); // favicon

    // express dev config
    if ('development' == config.get('env')) {
       app.use(errorHandler());
    }
};

// register handlebars partials
module.exports.registerPartials = function (path, handlebars) {
    var partials = path;
    fs.readdirSync(partials).forEach(function (folder) {
        var extension = folder.split('.')[1];
        if (extension != undefined) return;
        fs.readdirSync(partials+folder).forEach(function (file) {
            var extension = file.split('.')[1];
            if(extension != 'html') return;
            var source = fs.readFileSync(partials + folder + '/' + file, "utf8");
            var partial = folder+'-'+file.split('.')[0];
            handlebars.registerPartial(partial, source); // register partial
        });
    });
};

// register handlebars block helpers
module.exports.registerHelpers = function (helpers, handlebars) {
    for (var helper in helpers) {
        if (helpers.hasOwnProperty(helper)) {
            handlebars.registerHelper(helper, helpers.helper);
        }
    }
    return;
};

// create session store
module.exports.sessions = function (SessionStore, config) {
    var authObject;

    if (config.get('database.redis.url')) {
        var parsedUrl = url.parse(config.get('database.redis.url'));
        authObject = {
            prefix: config.get('database.redis.prefix'),
            host: parsedUrl.hostname,
            port: parsedUrl.port,
            db: config.get('database.redis.db'),
            pass: parsedUrl.auth ? parsedUrl.auth.split(":")[1] : null,
            secret: config.get('server.secret')
        };
    }

    return new SessionStore(authObject);
};

// connect to backend store (db)
module.exports.db = function (db, url)  {
    db.connect(url);
};

// run application
module.exports.run = function (server, config) {
    server.listen(config.get('server.port'), function () {
        debug('listening on port %d'.green, server.address().port);
    });
};