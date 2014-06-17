exports = module.exports = function () {
    return {
        times: require('./times')(),
        equals: require('./equals')(),
        json: require('./json')(),
        tagify: require('./tagify')(),
        capitalize: require('./capitalize')()
    };
};