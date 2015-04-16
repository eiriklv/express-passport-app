exports = module.exports = function(passport) {
    return function(req, res, next) {
        if (req.accepts('json')) {
            // passport.authenticate('local-login', function () {
            //     console.log(arguments);
            //     return;
            // })(req, res, next);

            passport.authenticate('local-login', {session:false})(req, res, function(req2, res2) {
                res.status(200).send();
            });

        }
        else {
            passport.authenticate('local-login', {
                successRedirect: '/', // redirect to the secure profile section
                failureRedirect: '/auth/local/login', // redirect back to the signup page if there is an error
                failureFlash: true // allow flash messages
            })(req, res, next);
        }
    };
};
