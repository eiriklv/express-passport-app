var async = require('async');
var logger = require('edge-logger').Logger();

exports = module.exports = function(models) {
    return function(req, callback) {
        if (!req.query) return callback(new Error('no request query'));
        if (!req.query.token) return callback(new Error('verification token missing! try again with a valid token (see e-mail)'));

        models.VerificationToken.find(req.query.token)
            .then(destroyToken)
            .then(verifyUser)
            .then(function (user) {
                req.logIn(user, function(err) {
                    return callback(err);
                });
            })
            .catch(function(err) {
                return callback(err);
            });
    };

    function destroyToken(tokenEntry) {
        if (!tokenEntry) throw new Error('invalid token');

        console.log("found token with uid:", tokenEntry.uid);

        return tokenEntry.destroy().then(function(res) {
            return tokenEntry.uid;
        }).catch(function(err) {
            logger.error("tokenEntry destroy Error", err);
            throw err;
        });
    }

    function verifyUser(uid) {
        if (!uid) throw new Error('invalid verification token!');

        return models.User.find(uid)
            .then(function(userEntry) {
                if (!userEntry) throw new Error('no user entry for supplied token');

                userEntry.verified = true;

                return userEntry.save().then(function(res) {
                    return res;
                }).catch(function(err) {
                    logger.error("userEntry save Error", err);
                });
            }).catch(function(err) {
                logger.error("verifyUser Error", err);
                throw err;
            });
    }
};