var expect = require('chai').expect;
var rp = require('request-promise');
var app = require('../../../app');

exports = module.exports = function () {
  describe('Local', function() {
    describe('login form', function() {
      it('should render', function(done) {
        rp('http://localhost:3000/auth/local/login')
          .then(function (res) {
            expect(res.indexOf('<form')).to.not.eq(-1);
          })
          .catch(function (err) {
            throw err;
          })
          .finally(function () {
            done();
          });
      });
    });

    describe('forgot form', function() {
      it('should render', function(done) {
        rp('http://localhost:3000/auth/local/forgot')
          .then(function (res) {
            expect(res.indexOf('<form')).to.not.eq(-1);
          })
          .catch(function (err) {
            throw err;
          })
          .finally(function () {
            done();
          });
      });
    });

    describe('signup form', function() {
      it('should render', function(done) {
        rp('http://localhost:3000/auth/local/signup')
          .then(function (res) {
            expect(res.indexOf('<form')).to.not.eq(-1);
          })
          .catch(function (err) {
            throw err;
          })
          .finally(function () {
            done();
          });
      });
    });

    describe('forgot, reset, login, logout', function() {
      it('should do all the things', function(done) {
        var forgotOptions = {
          uri: 'http://localhost:3000/auth/local/forgot',
          method: 'POST',
          form: {
            email: 'john@doe.com'
          }
        };

        rp(forgotOptions)
          .catch(function (err) {
            expect(err.response.headers.location).to.eq('/');
            return err;
          })
          .then(function (argument) {
            var resetOptions = {
              uri: 'http://localhost:3000/auth/local/reset',
              method: 'POST',
              form: {
                token: process.user.resetPasswordToken,
                new_password: 'aNewerPassword',
                new_password_confirm: 'aNewerPassword'
              }
            };

            return rp(resetOptions);
          })
          .catch(function (err) {
            expect(err.response.headers.location).to.eq('/auth/local/login');
            return err;
          })
          .then(function (argument) {
            var loginOptions = {
              uri: 'http://localhost:3000/auth/local/login',
              method: 'POST',
              form: {
                email: 'john@doe.com',
                password: 'aNewerPassword'
              }
            };

            return rp(loginOptions);
          })
          .catch(function (err) {
            expect(err.response.headers.location).to.eq('/');
            return err;
          })
          .then(function (argument) {
            var logoutOptions = {
              uri: 'http://localhost:3000/auth/local/logout',
              method: 'GET',
              form: {
                email: 'john@doe.com',
                password: 'aNewerPassword'
              }
            };

            return rp(logoutOptions);
          })
          .then(function (argument) {
            expect(argument.indexOf('<html>')).to.not.eq(-1);
            done();
          });
      });
    });

    describe('forgot, reset, login, logout', function() {
      it('should do all the things', function(done) {
        var signupOptions = {
          uri: 'http://localhost:3000/auth/local/signup',
          method: 'POST',
          form: {
            email: 'bob@dole.com',
            password: '123456',
            password_confirm: '123456'
          }
        };

        rp(signupOptions)
          .catch(function (err) {
            expect(err.response.headers.location).to.eq('/');
            return err;
          })
          .then(function (argument) {
            var verifyOptions = {
              uri: 'http://localhost:3000/auth/local/verify?' + process.token,
              method: 'GET'
            };

            return rp(verifyOptions);
          })
          .then(function (body) {
            expect(body.indexOf('Home')).to.not.eq(-1);
            return body;
          })
          .then(function (argument) {
            var unlinkOptions = {
              uri: 'http://localhost:3000/auth/local/unlink',
              method: 'GET'
            };

            return rp(unlinkOptions);
          })
          .then(function (body) {
            expect(body.indexOf('Home')).to.not.eq(-1);
            done();
          })
      });
    });  
  });

describe('Local', function() {

  describe('forgot, reset, login, logout', function() {
    it('should do all the things', function(done) {
      var forgotOptions = {
        uri: 'http://localhost:3000/auth/local/forgot',
        headers: { 'Accept': 'application/json' },
        method: 'POST',
        form: {
          email: 'john@doe.com'
        }
      };

      rp(forgotOptions)
        .catch(function (err) {
          expect(err.response.headers.location).to.eq('/');
          return err;
        })
        .then(function (argument) {
          var resetOptions = {
            uri: 'http://localhost:3000/auth/local/reset',
            method: 'POST',
            form: {
              token: process.user.resetPasswordToken,
              new_password: 'aNewerPassword',
              new_password_confirm: 'aNewerPassword'
            }
          };

          return rp(resetOptions);
        })
        .catch(function (err) {
          expect(err.response.headers.location).to.eq('/auth/local/login');
          return err;
        })
        .then(function (argument) {
          var loginOptions = {
            uri: 'http://localhost:3000/auth/local/login',
            method: 'POST',
            form: {
              email: 'john@doe.com',
              password: 'aNewerPassword'
            }
          };

          return rp(loginOptions);
        })
        .catch(function (err) {
          expect(err.response.headers.location).to.eq('/');
          return err;
        })
        .then(function (argument) {
          var logoutOptions = {
            uri: 'http://localhost:3000/auth/local/logout',
            method: 'GET',
            form: {
              email: 'john@doe.com',
              password: 'aNewerPassword'
            }
          };

          return rp(logoutOptions);
        })
        .then(function (argument) {
          expect(argument.indexOf('<html>')).to.not.eq(-1);
          done();
        });
    });
  });

  describe('forgot, reset, login, logout', function() {
    it('should do all the things', function(done) {
      var signupOptions = {
        uri: 'http://localhost:3000/auth/local/signup',
        method: 'POST',
        form: {
          email: 'bob@dole.com',
          password: '123456',
          password_confirm: '123456'
        }
      };

      rp(signupOptions)
        .catch(function (err) {
          expect(err.response.headers.location).to.eq('/');
          return err;
        })
        .then(function (argument) {
          var verifyOptions = {
            uri: 'http://localhost:3000/auth/local/verify?' + process.token,
            method: 'GET'
          };

          return rp(verifyOptions);
        })
        .then(function (body) {
          expect(body.indexOf('Home')).to.not.eq(-1);
          return body;
        })
        .then(function (argument) {
          var unlinkOptions = {
            uri: 'http://localhost:3000/auth/local/unlink',
            method: 'GET'
          };

          return rp(unlinkOptions);
        })
        .then(function (body) {
          expect(body.indexOf('Home')).to.not.eq(-1);
          done();
        })
    });
  });  
});

};