exports = module.exports = function(service) {
    return {
        message: function(user) {
            return '<p>' + 'Welcome to ' + service + ' ' + user.fullname + '!' + '</p>' +
                '<p>' + 'You have now linked your Instagram account to this service' + '</p>';
        },
        title: function() {
            return 'You linked your Instagram account to our service';
        }
    };
};
