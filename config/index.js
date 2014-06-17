// throw error
function _throw (m) {
    throw m;
}

// dependencies
var util = require('util');
var convict = require('convict');
var debug = require('debug')('express-passport-app:configuration');
var validator = require('validator');

// catch all errors with no handler
process.on('uncaughtException', function (err) {
    debug('Caught exception without specific handler: ' + util.inspect(err));
    debug(err.stack, 'error');
    process.exit(1);
});

// application config
var config = module.exports = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development'],
        default: 'development',
        env: 'NODE_ENV'
    },
    service: {
        name: {
            doc: 'The name of your service/platform.',
            default: 'Some cool service',
            env: 'SERVICE_NAME'
        }
    },
    session: {
        key: {
            doc: 'Session key.',
            default: 'connect.sid',
            env: 'SESSION_KEY'
        }
    },
    server: {
        port: {
            doc: 'The server port to bind.',
            format: 'port',
            default: 0,
            env: 'PORT'
        },
        secret: {
            doc: 'The application secret (sessions).',
            format: function (val) {
                if (!validator.isLength(val, 10)) _throw(new Error('Application secret must be at least 10 characters'));
            },
            default: 'somesillysecret',
            env: 'APPSECRET'
        }
    },
    client: {
        api: {
            path: {
                doc: 'The client api url path (relative)',
                default: '/api',
                env: 'CLIENT_API_PATH'
            }
        }
    }
    database: {
        mongo: {
            url: {
                doc: 'MongoDB url to connect to (including db reference)',
                default: 'mongodb://localhost/express-passport-app',
                env: 'MONGO_URL'
            }
        },
        redis: {
            url: {
                doc: 'Redis url to connect to (including auth string)',
                default: 'redis://localhost:6379',
                env: 'REDIS_URL'
            },
            prefix: {
                doc: 'Redis session prefix (to separate session for different processes)',
                default: 'sess:',
                env: 'REDIS_SESSION_PREFIX'
            },
            db: {
                doc: 'Redis database number (0-15)',
                default: 0,
                env: 'REDIS_DB'
            }
        }
    },
    mandrill: {
        api: {
            key: {
                doc: 'Mandrill API key',
                default: '0000000000',
                env: 'MANDRILL_API_KEY'
            }
        },
        sender: {
            doc: 'The "from" field for the verification emails',
            default: 'Some User <someuser@company.com>',
            env: 'MANDRILL_SENDER'
        }
    },
    email: {
        verification: {
            route: {
                doc: 'Where to redirect verification tokens',
                default: 'http://localhost:3000/auth/local/verify',
                env: 'EMAIL_VERIFICATION_ROUTE'
            }
        }
    },
    facebook: {
        client: {
            id: {
                doc: 'Facebook application client id.',
                default: 'abcdefghijklmnopqrstuvwxyz',
                env: 'FACEBOOK_CLIENT_ID'
            },
            secret: {
                doc: 'Facebook application client id.',
                default: 'abcdefghijklmnopqrstuvwxyz',
                env: 'FACEBOOK_CLIENT_SECRET'
            }
        },
        callback: {
            url: {
                doc: 'Facebook application callback url.',
                format: 'url',
                default: 'http://localhost:3000/auth/facebook/callback',
                env: 'FACEBOOK_CALLBACK_URL'
            }
        }
    },
    google: {
        client: {
            id: {
                doc: 'Google application client id.',
                default: 'abcdefghijklmnopqrstuvwxyz',
                env: 'GOOGLE_CLIENT_ID'
            },
            secret: {
                doc: 'Google application client id.',
                default: 'abcdefghijklmnopqrstuvwxyz',
                env: 'GOOGLE_CLIENT_SECRET'
            }
        },
        callback: {
            url: {
                doc: 'Google application callback url.',
                format: 'url',
                default: 'http://localhost:3000/auth/google/callback',
                env: 'GOOGLE_CALLBACK_URL'
            }
        }
    },
    instagram: {
        client: {
            id: {
                doc: 'Instagram application client id.',
                default: 'abcdefghijklmnopqrstuvwxyz',
                env: 'INSTAGRAM_CLIENT_ID'
            },
            secret: {
                doc: 'Instagram application client id.',
                default: 'abcdefghijklmnopqrstuvwxyz',
                env: 'INSTAGRAM_CLIENT_SECRET'
            }
        },
        callback: {
            url: {
                doc: 'Instagram application callback url.',
                format: 'url',
                default: 'http://localhost:3000/auth/instagram/callback',
                env: 'INSTAGRAM_CALLBACK_URL'
            }
        }
    }
});

// print the environment for debugging
debug(util.inspect(process.env, { colors: true }));

// perform the config validation
config.validate();
