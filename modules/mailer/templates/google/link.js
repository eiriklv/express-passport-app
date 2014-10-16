exports = module.exports = function(service) {
    return {
        message: function(user) {
            return '<p>' + 'Welcome to ' + service + ' ' + user.fullname + '!' + '</p>' +
                '<p>' + 'You have now linked your Google+ account to this service' + '</p>';
        },
        title: function() {
            return 'You linked your Google+ account to our service';
        }
    };
};
