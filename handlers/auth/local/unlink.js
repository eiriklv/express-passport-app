exports = module.exports = function(profile) {
    return function(req, res, next) {
        profile.unlink(req.query.email, function (err) {
          if (req.accepts('json')) {
            if (err) {
              res.status(400).send({ error: err });
            }
            else {
              res.status(200).send();
            }
          }
          else {
            if (err) {
              req.flash('deleteMessage', 'Error deleting account.');
              res.redirect('/');
            }
            else {
              req.logout();
              req.flash('deleteMessage', 'Your account was deleted.');
              res.redirect('/');
            }
          }
        });
    };
};
