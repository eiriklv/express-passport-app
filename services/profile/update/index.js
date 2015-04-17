exports = module.exports = function(models) {
  return function(req, callback) {
    if (!req.body) return callback(new Error('no request body'));
    if (!req.user) return callback(new Error('no request user'));

    if (!req.user.dataValues.profile) {
      req.user.dataValues.profile = {};
    }

    var user = req.user;
    var profile = user.dataValues.profile;
    var body = req.body;
    var bodyProfile = body.profile;
    var dirty = false;

    for (var b in bodyProfile) {
      if (profile[b] !== bodyProfile[b]) {
        profile[b] = bodyProfile[b];
        dirty = true;
      }
    }

    if (body.email !== user.email) {
      user.email = body.email;
      dirty = true;
    }

    if (!dirty) {
      return callback(null, user);
    }

    req.user.save().then(function() {
      return callback(null, user);
    }).catch(function(err) {
      return callback(err, user);
    });
  };
};
