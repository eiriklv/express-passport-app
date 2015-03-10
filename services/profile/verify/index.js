var async = require('async');

exports = module.exports = function(models) {
    return function(req, callback) {
        if (!req.query) return callback('no request query');
        if (!req.query.token) return callback('verification token missing! try again with a valid token (see e-mail)');

        var uid, user;

        // todo - use async.waterfall for better flow
        async.series({
            checkToken: function(callback) {
                models.VerificationToken.find(req.query.token)
                    .then(function(tokenEntry) {
                        if (!tokenEntry) return callback('invalid token');

                        uid = tokenEntry.uid;

                        tokenEntry.remove(function(err) {
                            callback(err);
                        });
                    }).catch(function(err) {
                        return callback(err);
                    });
            },
            verifyUser: function(callback) {
                if (!uid) return callback('invalid verification token!');

                models.User.find(uid)
                    .then(function(userEntry) {
                        if (err) return callback(err);
                        if (!userEntry) return callback('no user entry for supplied token');

                        user = userEntry;
                        userEntry.verified = true;

                        userEntry.save(function(err) {
                            callback(err);
                        });
                    }).catch(function(err) {
                        return callback(err);
                    })

            },
            logInUser: function(callback) {
                if (!uid) return callback('invalid verification token! no login performed');

                req.logIn(user, function(err) {
                    callback(err);
                });
            }
        }, function(err, results) {
            callback(err);
        });
    };
};
