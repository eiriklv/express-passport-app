exports = module.exports = function() {
    return function(req, res, next) {
      req.logout();
      if (req.accepts('json')) {
          res.status(200).send();
      }
      else {
          req.flash('info', 'Logged Out');
          res.redirect('/');
      }
    };
};
