exports = module.exports = function(service) {
    return {
        message: function(user, options) {
            return '<p>' + 'Wanna reset your password, huh?' +
                '<p>' + 'Click on ' + '<a href="' + options.resetRoute + '?token=' + user.resetPasswordToken + '">this link</a>';
        },
        title: function() {
            return 'Password reset time!';
        }
    };
};
