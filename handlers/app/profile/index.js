var nodejsx = require('node-jsx').install();
var App = require('client/profile');
var _ = require('highland');
var helpers = require('helpers');

exports = module.exports = function(services) {
    return function(req, res, next) {
        var context = {
            title: 'Profile page',
            description: 'React profile page',
            user: req.user.toObject(),
            messages: req.flash()
        };

        var data = _([{
            component: App,
            clientScripts: ['/javascript/profile.js'],
            context: context,
            staticPage: false,
        }]);

        data
            .map(_.wrapCallback(helpers.react.renderMarkupToString)).series()
            .errors(next.bind(next))
            .each(res.send.bind(res));
    };
};
