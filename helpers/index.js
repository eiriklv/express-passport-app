exports = module.exports = function () {
    return {
        validators: require('./validators')(),
        common: require('./common')(),
        handlebars: require('./handlebars')(),
        react: require('./react')()
    };
};
