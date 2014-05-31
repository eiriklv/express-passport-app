exports = module.exports = function (resource) {
    return function (req, res) {
        resource.remove(req.body, function (err, result) {
            res.send(200, result);
        });
    };
};