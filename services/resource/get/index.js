exports = module.exports = function (Resource) {
    return function (query, callback) {
        callback(null, query);
    };
};