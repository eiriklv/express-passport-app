exports = module.exports = function() {
    return function(req, res) {
        req.logout();
        res.redirect('/');
    };
};
