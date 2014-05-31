exports = module.exports = function (profile) {
    return function (req, res) {
        profile.update(req, function (err, user) {
            if (err) return res.send(500, err);
            res.send(200, user);
        });
    };
};