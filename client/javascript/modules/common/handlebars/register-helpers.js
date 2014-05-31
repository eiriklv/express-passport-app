// register handlebars block helpers
exports = module.exports = function (helpers, handlebars) {
    for (var helper in helpers) {
        if (helpers.hasOwnProperty(helper)) {
            handlebars.registerHelper(helper, helpers[helper]);
        }
    }
    return;
};