// dependencies
var expect = require('chai').expect;

exports = module.exports = function (profile, models) {
    // test
    describe('Profile', function(){
        describe('#verify()', function () {
            var user;

            before(function (done) {
                // create fake user
                user = new models.User({
                    email: 'john@doe.com',
                    fullname: 'John Doe',
                    verified: false
                });

                // set password
                user.password = user.generateHash('1234');

                // save user
                user.save(function (err) {
                    // create fake verification token
                    var validToken = new models.VerificationToken({
                        token: 'aa',
                        uid: user._id
                    });

                    // save token
                    validToken.save(function (err) {
                        done();
                    });
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
                    expect(err).to.equal('invalid token');
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
                user = new models.User({
                    email: 'john@doe.com',
                    fullname: 'John Doe',
                    verified: false
                });

                // set password
                user.password = user.generateHash('1234');

                // save user
                user.save(function (err) {
                    done();
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
                        fullname: user.fullname
                    }
                };

                profile.update(req, function (err, updatedUser) {
                    expect(err).to.equal();
                    expect(updatedUser).to.equal(user);
                    done();
                });
            });

            it('should update your name', function (done) {
                var updatedName = 'John Douchebag';

                var req = {
                    user: user,
                    body: {
                        fullname: updatedName
                    }
                };

                profile.update(req, function (err, updatedUser) {
                    expect(updatedUser.fullname).to.equal(updatedName);
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