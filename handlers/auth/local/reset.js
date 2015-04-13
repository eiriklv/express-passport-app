exports = module.exports = function() {
    return function(req, res) {
        if (req.query.token) {
            res.render('reset', {token: req.query.token});
        }
        else {
            res.status(404).end();
        }
    };
};
