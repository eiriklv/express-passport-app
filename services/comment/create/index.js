exports = module.exports = function (Comment, helpers) {
    return function (body, callback) {
        if (!body) callback('body missing');
        console.log(body);

        var comment = new Comment({
            author: body.author,
            text: body.text
        });

        comment.save(function (err, product) {
            callback(err, product);
        });
    };
};