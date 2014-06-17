// dependencies
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

// mock mongoose
mockgoose(mongoose);

// fake connect to db
mongoose.connect('mongodb://localhost/fakedb');

// test subjects dependencies
var helpers = require('../../helpers')();
var models = require('../../models')(mongoose, helpers.validators);

// test subjects
var profile = require('../../services/profile')(models, helpers);
var resource = require('../../services/resource')(models, helpers);

// tests
describe('Services', function(){
    require('./profile')(profile, models);
    require('./resource')(resource, models);
});