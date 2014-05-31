exports = module.exports = function (passport) {
    return {
        link: require('./link')(passport),
        authCallback: require('./callback')(passport),
        unlink: require('./unlink')()
    };
};