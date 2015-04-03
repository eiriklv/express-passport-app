exports = module.exports = function(profile) {
    return function(req, res) {
        profile.update(req, function(err, user) {
            if (req.headers && req.headers.accept && (req.headers.accept.indexOf('text/html') > -1)) {
                if (err) {
                    req.flash('updateError', err.message);
                    res.render('index', {user: user.dataValues});
                }
                else {
                    req.flash('updateMessage', 'Profile updated!');
                    res.render('index', {user: user.dataValues});
                }
            }
            else {
                if (err) {
                    return res.status(500).send(err);
                }
                else {
                    res.status(200).send(user);  
                }
            }
        });
    };
};
