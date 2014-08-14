exports = module.exports = function (request, path) {
    return function (body, callback) {
        request
            .post(path)
            .send(body)
            .end(function (error, res) {
                if (error) return callback(error);
                if (res.status != 201) return callback('unexpected response code: ' + res.status);
                if (!res.body) return callback('no body');

                callback(null, res.body);
            });
    };
};
