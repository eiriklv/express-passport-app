exports = module.exports = function (profile) {
    return function (req, res) {
        res.send(200, req.user);
    };
};