exports = module.exports = function () {
    return function (req, res) {
        res.render('home', {
            title: 'Home',
            icon: 'fa-magic',
            user : req.user // get the user out of session and pass to template
        });
    };
};