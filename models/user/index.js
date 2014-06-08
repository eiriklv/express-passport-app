var bcrypt   = require('bcrypt');

exports = module.exports = function (collection, mongoose, validators) {
    var schema = mongoose.Schema({
        email: {
            type: String, // this is the verified email used to contact the user (must be verified for local signup)
            validate: [validators.email, 'email is not valid'],
            index: true
        },
        password: {
            type: String, // need validator for this (password strength - do this on frontend)
            required: true
        },
        fullname: {
            type: String, // this needs verification/escape/cleaning
            required: true
        },
        verified: {
            type: Boolean,
            default: false // this is automatically set true for both facebook and google, but must be verified for local
        },
        facebook: {
            id: {
                type: String,
                index: true
            },
            token: String,
            email: String,
            name: String
        },
        google: {
            id: {
                type: String,
                index: true
            },
            token: String,
            email: String,
            name: String
        },
        instagram: {
            id: {
                type: String,
                index: true
            },
            token: String,
            username: String,
            name: String,
            profile_picture: String
        }
    });

    schema.methods.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); // this is syncronous (future: async)
    };

    schema.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password); // this is syncronous (future: async)
    };

    return mongoose.model(collection, schema);
};