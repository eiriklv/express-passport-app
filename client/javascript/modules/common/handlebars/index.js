var handlebars = require('hbsfy/runtime');
var helpers = require('../../../../../helpers')();

exports = module.exports = function () {
    return {
        registerHelpers: require('./register-helpers')(helpers.handlebars, handlebars),
        registerPartials: require('./register-partials')()
    };
};