// dependencies
var sequelize = require('../../database/sequelize.js');
var config = require('../../config');

// test subjects dependencies
var models = require('../../models')(sequelize);
var mailer = require('modules/mailer')({
    env: 'test',
    serviceName: config.get('service.name'),
    verificationRoute: config.get('email.verification.route'),
    resetRoute: config.get('email.reset.route')
});

// test subjects
var profile = require('../../services/profile')(models, mailer);
var resource = require('../../services/resource')(models);

// tests
describe('Services', function(){
    require('./profile')(profile, models);
    require('./resource')(resource, models);
});
