var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var InstagramStrategy = require('passport-instagram').Strategy;
var config = require('config');

exports = module.exports = function(passport, authentication, models) {
    passport.serializeUser(function(user, done) {
        done(null, user.id); // this is what gets attached to the session
    });

    passport.deserializeUser(function(id, done) {
        models.User.find(id)
            .then(function(user) {
                done(null, user);
            })
            .catch(function(err) {
                done(err);
            });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email', // by default, local strategy uses username and password, we will override with email
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, authentication.local.signup));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email', // by default, local strategy uses username and password, we will override with email
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, authentication.local.login));

    passport.use(new FacebookStrategy({
        clientID: config.get('facebook.client.id'),
        clientSecret: config.get('facebook.client.secret'),
        callbackURL: config.get('facebook.callback.url'),
        passReqToCallback: true
    }, authentication.facebook.auth));

    passport.use(new GoogleStrategy({
        clientID: config.get('google.client.id'),
        clientSecret: config.get('google.client.secret'),
        callbackURL: config.get('google.callback.url'),
        passReqToCallback: true
    }, authentication.google.auth));

    passport.use(new InstagramStrategy({
        clientID: config.get('instagram.client.id'),
        clientSecret: config.get('instagram.client.secret'),
        callbackURL: config.get('instagram.callback.url'),
        passReqToCallback: true
    }, authentication.instagram.auth));
};
