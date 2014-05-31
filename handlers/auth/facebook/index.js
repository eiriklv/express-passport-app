exports = module.exports = function (passport) {
    return {
        auth: require('./auth')(passport),
        link: require('./link')(passport),
        authCallback: require('./callback')(passport),
        unlink: require('./unlink')()
    };
};