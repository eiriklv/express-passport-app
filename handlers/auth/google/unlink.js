exports = module.exports = function () {
	return function (req, res, next) {
        var user = req.user;
        user.google = undefined;
        req.flash('deleteMessage', 'Your Google account was un-linked.');
        var referer = req.headers.referer || '/home';

        user.save(function(err) {
            res.redirect(referer);
        });
    };
};