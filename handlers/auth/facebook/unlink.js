exports = module.exports = function() {
    return function(req, res, next) {
        var user = req.user;
        user.facebook = undefined;
        req.flash('deleteMessage', 'Your Facebook account was un-linked.');
        var referer = req.headers.referer || '/';

        user.save(function(err) {
            res.redirect(referer);
        });
    };
};
