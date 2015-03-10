// dependencies
var sequelize = require('../../database/sequelize.js');

// test subjects dependencies
var models = require('../../models')(sequelize);

// test subjects
var profile = require('../../services/profile')(models);
var resource = require('../../services/resource')(models);

// tests
describe('Services', function(){
    require('./profile')(profile, models);
    require('./resource')(resource, models);
});
