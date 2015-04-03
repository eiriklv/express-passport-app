exports = module.exports = function(profile) {
    return function(req, res) {
        if (req.headers && req.headers.accept && (req.headers.accept.indexOf('text/html') > -1)) {
            res.render('profile', {user: req.user});
        }
        else {
            res.status(200).send(req.user);
        }
    };
};
