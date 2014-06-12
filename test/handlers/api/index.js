exports = module.exports = function () {
    // mock of profile service (should be sinon stub?)
    var profileMock = function profile (err, user) {
        return {
            update: function (req, callback) {
                callback(err, user);
            }
        };
    };

    // mock of resource service (should be sinon stub?)
    var resourceMock = function resource (err) {
        return {
            create: function (body, callback) {
                callback(err, body);
            },
            edit: function (body, callback) {
                callback(err, body);
            },
            get: function (body, callback) {
                callback(err, body);
            },
            remove: function (body, callback) {
                callback(err, body);
            }
        };
    };

    // tests subjects
    var services = {};
    services.profile = {
        success: require('../../../handlers/api/profile')(profileMock(null, { fullname: 'John Doe' })),
        error: require('../../../handlers/api/profile')(profileMock('error'))
    };
    services.resource = {
        success: require('../../../handlers/api/resource')(resourceMock()),
        error: require('../../../handlers/api/resource')(resourceMock('error'))
    };

    // tests
    describe('Handlers', function(){
        require('./profile')(services.profile);
        require('./resource')(services.resource);
    });
};