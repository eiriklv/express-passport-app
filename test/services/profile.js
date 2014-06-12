// dependencies
var expect = require('chai').expect;

// mocks/stubs
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
mockgoose(mongoose);
mongoose.connect('mongodb://localhost/fakedb');

// test subjects dependencies
var helpers = require('../../common').helpers();
var models = require('../../models')(mongoose, helpers.validators);

// test subject
var profile = require('../../services/profile')(models, helpers);

// test
describe('Profile', function(){
    describe('#verify()', function () {
        var user;

        before(function (done) {
            // create fake user
            user = new models.User({
                email: 'john@doe.com',
                password: '1234',
                fullname: 'John Doe',
                verified: false
            });

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
});