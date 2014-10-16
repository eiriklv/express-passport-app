exports = module.exports = function(profile) {
    return function(req, res) {
        res.status(200).send(req.user);
    };
};
