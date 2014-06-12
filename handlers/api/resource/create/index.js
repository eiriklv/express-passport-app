exports = module.exports = function (resource) {
    return function (req, res) {
        resource.create(req.body, function (err, result) {
            if (err) return res.send(400, err);
            res.send(201, result);
        });
    };
};