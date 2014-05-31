exports = module.exports = function () {
    return function (req, res) {
        res.render('profile', {
            title: 'Profile Page',
            icon: 'fa-lock',
            user: req.user // get the user out of session and pass to template
        });
    };
};