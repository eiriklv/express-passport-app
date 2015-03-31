exports = module.exports = function() {
    return function(req, res, next) {
        req.logout();
        req.flash('info', 'Logged Out');
        res.redirect('/');
    };
};
