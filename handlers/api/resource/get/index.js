exports = module.exports = function(resource) {
    return function(req, res) {
        resource.get(req.query, function(err, result) {
            if (err) return res.send(400, err);
            res.send(200, result);
        });
    };
};
