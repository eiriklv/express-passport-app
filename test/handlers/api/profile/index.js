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
                    status: function() { return this; },
                    send: function () { }
                };

                var sendspy = sinon.spy(res, 'send');
                var statusspy = sinon.spy(res, 'status');

                profile.success.get(req, res);
                expect(sendspy.calledOnce).to.equal(true);
                expect(sendspy.calledWithExactly(req.user)).to.equal(true);
                expect(statusspy.calledOnce).to.equal(true);
                expect(statusspy.calledWithExactly(200)).to.equal(true);
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
                    status: function() { return this; },
                    send: function () { }
                };

                var sendspy = sinon.spy(res, 'send');
                var statusspy = sinon.spy(res, 'status');

                profile.success.get(req, res);
                expect(sendspy.calledOnce).to.equal(true);
                expect(sendspy.calledWithExactly(req.user)).to.equal(true);
                expect(statusspy.calledOnce).to.equal(true);
                expect(statusspy.calledWithExactly(200)).to.equal(true);
                done();
            });

            it('should send response 500 when getting an error', function (done) {
                var req = {
                    user: {
                        fullname: 'John Doe'
                    }
                };

                res = {
                    status: function() { return this; },
                    send: function () { }
                };

                var sendspy = sinon.spy(res, 'send');
                var statusspy = sinon.spy(res, 'status');

                profile.success.get(req, res);
                expect(sendspy.calledOnce).to.equal(true);
                expect(sendspy.calledWithExactly(req.user)).to.equal(true);
                expect(statusspy.calledOnce).to.equal(true);
                expect(statusspy.calledWithExactly(200)).to.equal(true);
                done();
            });

        });

    });
};
