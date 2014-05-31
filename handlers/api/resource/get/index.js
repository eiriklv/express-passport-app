exports = module.exports = function (resource) {
    return function (req, res) {
        resource.get(req.query, function (err, result) {
            res.send(200, result);
        });
    };
};