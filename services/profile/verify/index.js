var debug = require('debug')('express-passport-app:service:profile:verify');
var async = require('async');

exports = module.exports = function (models, helpers) {
    return function (req, callback) {
        if (!req.query.token) return callback('Verification token missing! Try again with a valid token (see e-mail)');

        var uid, user;

        // todo - use async.waterfall for better flow
        async.series({
            checkToken: function (callback) {
                models.VerificationToken.findOne({ token: req.query.token }, function (err, tokenEntry) {
                    if (err || !tokenEntry) return callback(err);

                    uid = tokenEntry.uid;

                    tokenEntry.remove(function (err) {
                        callback(err);
                    });
                });
            },
            verifyUser: function (callback) {
                if (!uid) return callback('Invalid verification token!');

                models.User.findById(uid, function (err, userEntry) {
                    if (err) return callback(err);

                    user = userEntry;
                    userEntry.verified = true;

                    userEntry.save(function (err) {
                        callback(err);
                    });
                });

            },
            logInUser: function (callback) {
                if (!uid) return callback('Invalid verification token! No login performed');

                req.logIn(user, function (err) {
                    callback(err);
                });
            }
        }, function (err, results) {
            callback(err);
        });
    };
};