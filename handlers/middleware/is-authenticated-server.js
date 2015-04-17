exports = module.exports = function() {
    return function(req, res, next) {
        if (req.accepts('json') && !(req.headers.serversecret === "hammer-time")) {
          return res.status(403).send({error: "server not authenticated"});
        }
        return next();
    };
};
