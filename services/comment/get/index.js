exports = module.exports = function(Comment) {
    return function(body, callback) {
        Comment.find({}, function(err, comments) {
            comments = comments || [];
            callback(err, comments);
        })
    };
};
