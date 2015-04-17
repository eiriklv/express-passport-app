var bcrypt = require('bcryptjs');
var validators = require('helpers').validators;

exports = module.exports = function(collection, sequelize) {
    var self = this;
    var schema = {
        id: {
            type: sequelize.Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: sequelize.Sequelize.STRING,
            allowNull: false,
            validator: validators.email,
            unique: true
        },
        password: {
            type: sequelize.Sequelize.STRING,
            allowNull: false
        },
        resetPasswordToken: {
            type: sequelize.Sequelize.STRING,
            allowNull: true,
            unique: true
        },
        resetPasswordTokenExpires: {
            type: sequelize.Sequelize.DATE,
            allowNull: true
        },
        verified: {
            type: sequelize.Sequelize.BOOLEAN,
            defaultValue: false
        },
        profile: {
            type: sequelize.Sequelize.JSONB
        }
    };

    var User = sequelize.define('user', schema);

    User.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); // this is syncronous (future: async)
    };

    User.generateResetToken = function() {
        return bcrypt.hashSync(makeid(), bcrypt.genSaltSync(8), null); // this is syncronous (future: async)
    };

    User.validPassword = function(password1, password2) {
        return bcrypt.compareSync(password1, password2); // this is syncronous (future: async)
    };

    return User;
};

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
