exports = module.exports = function () {
    // mock of profile service (should be sinon stub?)
    var profile = function profile (err) {
        this.update = function (req, callback) {
            callback(err);
        };
    };

    // mock of resource service (should be sinon stub?)
    var resource = function resource (err) {
        this.create = function (body, callback) {
            callback(err, body);
        };
        this.edit = function (body, callback) {
            callback(err, body);
        };
        this.get = function (body, callback) {
            callback(err, body);
        };
        this.remove = function (body, callback) {
            callback(err, body);
        };
    };

    // tests subjects
    var services = {};
    services.profile = require('../../../handlers/api/profile')(profile);
    services.resource = require('../../../handlers/api/resource')(resource);

    // tests
    describe('Handlers', function(){
        require('./profile')(services.profile);
        require('./resource')(services.resource);
    });
};