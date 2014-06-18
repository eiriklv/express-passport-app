exports = module.exports = function () {
	return function (req, res, next) {
        if (!req.isAuthenticated()) return res.redirect('/');
        return next();
    };
};