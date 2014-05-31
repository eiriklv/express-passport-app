exports = module.exports = function (Resource) {
    return function (body, callback) {
        callback(null, body);
    };
};