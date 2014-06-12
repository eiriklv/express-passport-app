// dependencies
var expect = require('chai').expect;
var sinon = require('sinon');

exports = module.exports = function (profile) {

    describe('Profile', function () {

        describe('#get()', function () {

            it('should return profile if successful', function (done) {
                var req = {
                    user: {
                        fullname: 'John Doe'
                    }
                };

                res = {
                    send: function () { }
                };

                var sendspy = sinon.spy(res, 'send');

                profile.success.get(req, res);
                expect(sendspy.calledOnce).to.equal(true);
                expect(sendspy.calledWithExactly(200, req.user)).to.equal(true);
                done();
            });

        });

        describe('#update()', function () {

            it('should send response 200 with profile when updated', function (done) {
                var req = {
                    user: {
                        fullname: 'John Doe'
                    }
                };

                res = {
                    send: function () { }
                };

                var sendspy = sinon.spy(res, 'send');

                profile.success.update(req, res);
                expect(sendspy.calledOnce).to.equal(true);
                expect(sendspy.calledWithExactly(200, req.user)).to.equal(true);
                done();
            });

            it('should send response 500 when getting an error', function (done) {
                var req = {
                    user: {
                        fullname: 'John Doe'
                    }
                };

                res = {
                    send: function () { }
                };

                var sendspy = sinon.spy(res, 'send');

                profile.error.update(req, res);
                expect(sendspy.calledOnce).to.equal(true);
                expect(sendspy.calledWithExactly(500, 'error')).to.equal(true);
                done();
            });

        });

    });
};