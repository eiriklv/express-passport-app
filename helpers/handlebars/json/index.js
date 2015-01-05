exports = module.exports = function(context) {
    return JSON.stringify(context, null, 2).trim();
};
