exports = module.exports = function () {
	return function (req, res, next) {
        var user = req.user;
        req.flash('deleteMessage', 'Your account was deleted.');
        user.remove();
        req.logout();
        res.redirect('/');
    };
};