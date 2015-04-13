var crypto = require('crypto');

exports = module.exports = function(collection, sequelize) {
    var schema = {
        token: {
            type: sequelize.Sequelize.STRING, // sha1 hash of the user id
            allowNull: false,
            primaryKey: true
        },
        uid: {
            type: sequelize.Sequelize.INTEGER, // the id of the user to verify
            allowNull: false
        }
    };

    var VerificationToken = sequelize.define('verification_token', schema);

    VerificationToken.generateToken = function(uid) {
        var shasum = crypto.createHash('sha1');
        shasum.update(uid.toString());
        return shasum.digest('hex');
    };

    return VerificationToken;
};
