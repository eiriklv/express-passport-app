exports = module.exports = function(resource) {
    return function(req, res) {
        resource.edit(req.body, function(err, result) {
            if (err) return res.status(400).send(err);
            res.status(200).send(result);
        });
    };
};
