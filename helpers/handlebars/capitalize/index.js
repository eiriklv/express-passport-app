exports = module.exports = function() {
    return function(context) {
        return context.charAt(0).toUpperCase() + context.slice(1);
    };
};
