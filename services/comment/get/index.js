exports = module.exports = function(Comment, helpers) {
    return function(body, callback) {
        Comment.find({}, function(err, comments) {
            comments = comments || [];
            callback(err, comments);
        })
    };
};
