// dependencies
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

// mock mongoose
mockgoose(mongoose);

// fake connect to db
mongoose.connect('mongodb://localhost/fakedb');

// test subjects dependencies
var models = require('../../models')(mongoose);

// test subjects
var profile = require('../../services/profile')(models);
var resource = require('../../services/resource')(models);

// tests
describe('Services', function(){
    require('./profile')(profile, models);
    require('./resource')(resource, models);
});
