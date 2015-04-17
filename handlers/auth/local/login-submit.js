exports = module.exports = function(passport) {
    return function(req, res, next) {
        if (req.accepts('json')) {
            passport.authenticate('local-login', {session:false}, function(err, user, info) {
                if (err) {
                    res.status(400).send({error:req.flash('loginMessage')});
                }
                else if (!user) {
                    res.status(400).send({error:req.flash('loginMessage')});
                }
                else {
                    res.status(200).send();
                }
            })(req, res);
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
