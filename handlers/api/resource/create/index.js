exports = module.exports = function(resource) {
    return function(req, res) {
        resource.create(req.body, function(err, result) {
            if (err) return res.status(400).send(err);
            res.status(201).send(result);
        });
    };
};
