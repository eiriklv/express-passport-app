exports = module.exports = function (request, path) {
    return function (callback) {
        request
            .get(path)
            .end(function (error, res) {
                if (error) return callback(error);
                if (res.status != 200) return callback('unexpected response code: ' + res.status);

                callback(null, res.body);
            });
    };
};
