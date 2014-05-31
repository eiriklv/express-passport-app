exports = module.exports = function (resource) {
    return function (req, res) {
        resource.create(req.body, function (err, result) {
            res.send(201, result);
        });
    };
};