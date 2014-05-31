var crypto = require('crypto');

exports = module.exports = function (mongoose, validators) {
    var verificationTokenSchema = mongoose.Schema({
        token: {
            type: String, // sha1 hash of the mongodb user id
            required: true
        },
        uid: {
            type: mongoose.Schema.Types.ObjectId, // the id of the user to verify
            ref: 'User',
            required: true
        }
    });

    verificationTokenSchema.methods.generateToken = function (uid) {
        var shasum = crypto.createHash('sha1');
        shasum.update(uid.toString());
        return shasum.digest('hex');
    };

    return mongoose.model('VerificationToken', verificationTokenSchema);
};