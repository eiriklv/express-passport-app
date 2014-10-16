exports = module.exports = function() {
    return function(req, res, next) {
        if (!req.isAuthenticated()) return res.status(401).send({
            error: 'not authorized'
        });
        return next();
    };
};
