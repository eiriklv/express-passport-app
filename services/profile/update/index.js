var debug = require('debug')('express-passport-app:service:profile:update');
var async = require('async');

exports = module.exports = function (models, helpers) {
    return function (req, callback) {
        var user = req.user;

        async.series({
            updateProfile: function (callback) {
                user.fullname = helpers.formatName(req.body.fullname) || 'no name given';
                callback();
            },
            updatePassword: function (callback) {
                if (req.body.old_password.length === 0) return callback();

                var oldPass = req.body.old_password;
                var newPass = req.body.new_password;
                var confirmPass = req.body.new_password_confirm;
                var passCheck = user.validPassword(oldPass);
                var passValid = newPass.length>5 && newPass === confirmPass;

                if (passCheck && passValid) {
                    user.local.password = user.generateHash(newPass);
                    callback();
                }
                else if (!passCheck) {
                    callback('Password not valid.');
                }
                else {
                    callback('Passwords did not match, or was shorter than 6 characters! Try again.');
                }
            },
            saveProfile: function (callback) {
                user.save(function (err) {
                    callback(err);
                });
            }
        }, function (err, result) {
            callback(err, user);
        });
    };
};