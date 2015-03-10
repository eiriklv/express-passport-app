var bcrypt = require('bcryptjs');
var validators = require('helpers').validators;

exports = module.exports = function(collection, sequelize) {
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
        activationKey: {
            type: sequelize.Sequelize.STRING,
            allowNull: true
        },
        resetPasswordKey: {
            type: sequelize.Sequelize.STRING,
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

    User.validPassword = function(toCheck, existing) {
        console.log(toCheck, existing);
        return bcrypt.compareSync(toCheck, existing); // this is syncronous (future: async)
    };

    return User;
};
