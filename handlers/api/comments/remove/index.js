exports = module.exports = function (comments) {
    return function (req, res) {
        comments.remove(req.body, function (err, result) {
            if (err) return res.send(400, err);
            res.send(200, result);
        });
    };
};