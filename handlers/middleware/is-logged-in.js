exports = module.exports = function() {
    return function(req, res, next) {
        if (!req.accepts('json') && !req.isAuthenticated()) return res.redirect('/'); 
        return next();
    };
};
