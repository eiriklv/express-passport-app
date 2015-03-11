var debug = require('debug')('express-passport-app:service:profile:update');
var async = require('async');
var formatName = require('helpers').common.formatName;

exports = module.exports = function(models) {
    return function(req, callback) {
        if (!req.body) return callback(new Error('no request body'));

        var user = req.user;
        var body = req.body;
        var dirty = false;

        for (var b in body) {
            if (user[b] !== body[b]) {
                user[b] = body[b];
                dirty = true;
            }
        }

        if (!dirty) {
            return callback(null, user);
        }

        try {
            updatePassword(user, body);
        }
        catch(ex) {
            return callback(ex, user);
        }

        user.save().then(function() {
            return callback(null, user);
        }).catch(function(err) {
            return callback(err, user);
        });
    };

    function updatePassword(user, body) {
        if (!body.new_password) throw new Error('passwords did not match, or was shorter than 6 characters! try again');
        if (!body.old_password) throw new Error('old password undefined');
        if (body.old_password.length === 0) throw new Error('old password zero length');

        var oldPass = body.old_password;
        var newPass = body.new_password;
        var confirmPass = body.new_password_confirm;
        var passCheck = models.User.validPassword(oldPass, user.password);
        var newPassLength = newPass ? newPass.length : 0;
        var passValid = newPassLength > 5 && newPass === confirmPass;

        if (passCheck && passValid) {
            user.password = models.User.generateHash(newPass);
        } else if (!passCheck) {
            throw new Error('password not valid');
        } else {
            throw new Error('passwords did not match, or was shorter than 6 characters! try again');
        }
    }
};
