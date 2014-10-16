exports = module.exports = function(request, path) {
    return function(body, callback) {
        request
            .put(path)
            .send(body)
            .end(function(error, res) {
                if (error) return callback(error);
                if (res.status != 200) return callback('response code: ' + res.status + ' - ' + res.text);
                if (!res.body) return callback('no body');

                callback(null, res.body);
            });
    };
};
