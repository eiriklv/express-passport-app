// dependencies
var io = require('socket.io-client');
var handlebars = require('./modules/common/handlebars')(); // register handlebars helpers and partials
var extenders = require('./modules/common/extenders')(); // extend jquery to add some methods

// config
var config = require('./config');

// modules
var api = require('./modules/api')(config);
var templates = require('./templates')();
var messages = require('./modules/common/messages')();

// application
var app = require('./modules/profile/app')(templates, api); // this could be the main app

// debug
console.log('profile app started');
console.log(config);