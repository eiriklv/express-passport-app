// dependencies
var expect = require('chai').expect;
var logger = require('edge-logger').Logger();

exports = module.exports = function (profile, models) {
    // test
    describe('Profile', function(){
        var all = {
            'truncate': true
        };

        before(function (done) {
            models.User.sync();
            models.VerificationToken.sync();
            models.User.destroy(all)
                .then(function (res) {
                    logger.info('Destroyed all user records');
                    return models.VerificationToken
                        .destroy(all)
                        .then(function (res) {
                            logger.info('Destroyed all verification tokens');
                        })
                        .catch(function (err) {
                            logger.error('Error destroying all verification tokens', err);
                        });
                })
                .then(function () {
                    done();
                })
                .catch(function (err) {
                    logger.error('Error destroying all users', err);
                });
        });

        describe('#verify()', function () {
            var user;

            before(function (done) {
                // create fake user
                user = models.User.build({
                    email: 'john@doe.com',
                    verified: false
                });

                // set password
                user.password = models.User.generateHash('1234');

                // save user
                user.save().then(function () {
                    // create fake verification token
                    var validToken = models.VerificationToken.build({
                        token: 'aa',
                        uid: user.id
                    });

                    // save token
                    return validToken.save().catch(function(err) {
                        throw new Error("User save error" + err.message + err.stack);
                        done(err);
                    });
                }).then(function() {
                    done();
                }).catch(function(err) {
                    throw new Error("User save error" + err.message + err.stack);
                });
            });

            it('should callback with an error if the request query is missing', function (done) {
                // test input
                var req = {};

                profile.verify(req, function (err) {
                    expect(err).to.equal('no request query');
                    done();
                });
            });

            it('should callback with an error if the verification token is missing', function (done) {
                // test input
                var req = { query: {} };

                profile.verify(req, function (err) {
                    expect(err).to.equal('verification token missing! try again with a valid token (see e-mail)');
                    done();
                });
            });

            it('should callback with an error if the verification token is invalid', function (done) {

                // test input
                var req = {
                    query: {
                        token: 'asdfbnvcdsfghgggfdsaadfg'
                    }
                };

                profile.verify(req, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });

            it('should log in user and callback without error if a valid verification token is supplied', function (done) {
                // test input
                var req = {
                    user: user,
                    logIn: function (user, callback) {
                        callback();
                    },
                    query: {
                        token: 'aa'
                    }
                };

                profile.verify(req, function (err) {
                    expect(err).to.equal();
                    done();
                });
            });
        });

        describe('#update()', function () {
            var user;

            before(function (done) {
                // create fake user
                user = models.User.build({
                    email: 'john2@doe.com',
                    verified: false
                });

                // set password
                user.password = models.User.generateHash('1234');

                // save user
                user.save().then(function(res) {
                    // console.log("\n\nRES\n\n", res);
                    done();
                }).catch(function(err) {
                    throw new Error("User save error" + err.message + err.stack);
                });
            });

            it('should return an error when no request body is supplied', function (done) {
                var req = {};

                profile.update(req, function (err, user) {
                    expect(err).to.equal('no request body');
                    done();
                });
            });

            it('should return the same object if nothing is changed', function (done) {
                var req = {
                    user: user,
                    body: {
                        email: user.email
                    }
                };

                profile.update(req, function (err, updatedUser) {
                    expect(err).to.equal();
                    expect(updatedUser).to.equal(user);
                    done();
                });
            });

            it('should update your name', function (done) {
                var updatedEmail = 'john2@doe.com';

                var req = {
                    user: user,
                    body: {
                        email: updatedEmail
                    }
                };

                profile.update(req, function (err, updatedUser) {
                    expect(updatedUser.email).to.equal(updatedEmail);
                    done();
                });
            });

            it('should return the same object if you try to change password with the wrong old one', function (done) {
                var req = {
                    user: user,
                    body: {
                        old_password: '4321'
                    }
                };

                profile.update(req, function (err, updatedUser) {
                    expect(err).to.equal('password not valid');
                    expect(updatedUser).to.equal(user);
                    done();
                });
            });

            it('should return the same object if the old password matches, but the new one is invalid', function (done) {
                var req = {
                    user: user,
                    body: {
                        old_password: '1234'
                    }
                };

                profile.update(req, function (err, updatedUser) {
                    expect(err).to.equal('passwords did not match, or was shorter than 6 characters! try again');
                    expect(updatedUser).to.equal(user);
                    done();
                });
            });

            it('should return the same object if the old password matches, but the new one is not confirmed (missing)', function (done) {
                var req = {
                    user: user,
                    body: {
                        old_password: '1234',
                        new_password: 'newpassword'
                    }
                };

                profile.update(req, function (err, updatedUser) {
                    expect(err).to.equal('passwords did not match, or was shorter than 6 characters! try again');
                    expect(updatedUser).to.equal(user);
                    done();
                });
            });

            it('should return the same object if the old password matches, but the new one is not confirmed (invalid)', function (done) {
                var req = {
                    user: user,
                    body: {
                        old_password: '1234',
                        new_password: 'newpassword',
                        new_password_confirm: 'newpassword1234'
                    }
                };

                profile.update(req, function (err, updatedUser) {
                    expect(err).to.equal('passwords did not match, or was shorter than 6 characters! try again');
                    expect(updatedUser).to.equal(user);
                    done();
                });
            });

            it('should set a new password if the old one is correct, and the new one confirmed', function (done) {
                var req = {
                    user: user,
                    body: {
                        old_password: '1234',
                        new_password: 'newpassword',
                        new_password_confirm: 'newpassword'
                    }
                };

                profile.update(req, function (err, updatedUser) {
                    expect(err).to.equal();
                    expect(updatedUser.validPassword(req.body.new_password)).to.equal(true);
                    done();
                });
            });
        });
    });
};