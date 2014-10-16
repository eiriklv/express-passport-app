exports = module.exports = function() {
    return function(req, res, next) {
        if (!req.isAuthenticated()) return res.send(401, {
            error: 'not authorized'
        });
        return next();
    };
};
