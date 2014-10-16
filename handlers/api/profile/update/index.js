exports = module.exports = function(profile) {
    return function(req, res) {
        profile.update(req, function(err, user) {
            if (err) return res.status(500).send(err);
            res.status(200).send(user);
        });
    };
};
