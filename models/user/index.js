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
        }
    };

    var User = sequelize.define('user', schema);

    User.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); // this is syncronous (future: async)
    };

    User.generateResetToken = function(email) {
        return bcrypt.hashSync(email, bcrypt.genSaltSync(8), null); // this is syncronous (future: async)
    };

    User.validPassword = function(password1, password2) {
        return bcrypt.compareSync(password1, password2); // this is syncronous (future: async)
    };

    return User;
};
