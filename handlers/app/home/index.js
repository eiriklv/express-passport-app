var nodejsx = require('node-jsx').install();
var App = require('client/home');
var _ = require('highland');
var helpers = require('helpers');

exports = module.exports = function(services) {
    return function(req, res, next) {
        var context = {
            title: 'React demo',
            description: 'React demo description',
            user: req.user,
            messages: req.flash(),
            products: [{
                category: 'Sporting Goods',
                price: '$49.99',
                stocked: true,
                name: 'Football'
            }, {
                category: 'Sporting Goods',
                price: '$9.99',
                stocked: true,
                name: 'Baseball'
            }, {
                category: 'Sporting Goods',
                price: '$29.99',
                stocked: false,
                name: 'Basketball'
            }, {
                category: 'Electronics',
                price: '$99.99',
                stocked: true,
                name: 'iPod Touch'
            }, {
                category: 'Electronics',
                price: '$399.99',
                stocked: false,
                name: 'iPhone 5'
            }, {
                category: 'Electronics',
                price: '$199.99',
                stocked: true,
                name: 'Nexus 7'
            }],
            startTime: new Date()
        };

        var data = _([{
            component: App,
            clientScripts: ['/javascript/home.js'],
            context: context,
            staticPage: false
        }]);

        data
            .flatMap(_.wrapCallback(helpers.react.renderMarkupToString))
            .errors(next.bind(next))
            .each(res.send.bind(res));
    };
};
