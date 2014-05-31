exports = module.exports = function () {
	return function (req, res, next) {
        var user = req.user;
        user.instagram = undefined;
        req.flash('deleteMessage', 'Your Instagram account was un-linked.');
        var referer = req.headers.referer || '/home';

        user.save(function(err) {
            res.redirect(referer);
        });
    };
};