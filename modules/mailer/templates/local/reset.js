exports = module.exports = function(service) {
    return {
        message: function(user, options) {
            return '<p>' + 'Your password has been reset!' + '</p>';
        },
        title: function() {
            return 'Password reset!';
        }
    };
};
