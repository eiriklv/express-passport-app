exports = module.exports = function() {
    return function(req, res, next) {
        var user = req.user;
        user.destroy()
          .then(function (argument) {
            req.logout();
            req.flash('deleteMessage', 'Your account was deleted.');
            res.redirect('/');
          })
          .catch(function (err) {
            req.flash('deleteMessage', 'Error deleting account.');
            res.redirect('/');
          });
    };
};
