exports = module.exports = function (comments) {
    return function (req, res) {
        comments.get(req.query, function (err, result) {
            if (err) return res.send(400, err);
            res.send(200, result);
        });
    };
};