exports = module.exports = function(models) {
  return function(email, callback) {
    if (!email) return callback(new Error('Email argument required.'));

    models.User.destroy({
          'where': {
              'email': email
          }
      })
      .then(function (res) {
        if (res) {
          return callback(null);
        }
        else {
          return callback(new Error("User not found."));
        }
      })
      .catch(function (err) {
        return callback(err);  
      });
  };
};
