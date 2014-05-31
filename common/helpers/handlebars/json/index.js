exports = module.exports = function () {
    return function (context) {
        return JSON.stringify(context, null, 2).trim();
    };
};