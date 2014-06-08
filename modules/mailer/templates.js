exports = module.exports = function (serviceName) {
    return {
        facebook: {
            signup: {
                message: function (user, route, token, password) {
                    return '<p>' + 'Welcome to ' + serviceName + ' ' + user.fullname + '!' +'</p>' +
                           '<p>' + 'You registered through Facebook' + '</p>' +
                           '<p>' + 'Your username is: ' + user.email + '</p>' +
                           '<p>' + 'Your password is: ' + password + '</p>';
                },
                title: function () {
                    return 'Signup via Facebook';
                }
            },
            link: {
                message: function (user) {
                    return '<p>' + 'Welcome to ' + serviceName + ' ' + user.fullname + '!' +'</p>' +
                           '<p>' + 'You have now linked your Facebook account to this service' + '</p>';
                },
                title: function () {
                    return 'You linked your Facebook account to our service';
                }
            }
        },
        google: {
            signup: {
                message: function (user, route, token, password) {
                    return '<p>' + 'Welcome to ' + serviceName + ' ' + user.fullname + '!' +'</p>' +
                           '<p>' + 'You registered through Google+' + '</p>' +
                           '<p>' + 'Your username is: ' + user.email + '</p>' +
                           '<p>' + 'Your password is: ' + password + '</p>';
                },
                title: function () {
                    return 'Signup via Google+';
                }
            },
            link: {
                message: function (user) {
                    return '<p>' + 'Welcome to ' + serviceName + ' ' + user.fullname + '!' +'</p>' +
                           '<p>' + 'You have now linked your Google+ account to this service' + '</p>';
                },
                title: function () {
                    return 'You linked your Google+ account to our service';
                }
            }
        },
        instagram: {
            link: {
                message: function (user) {
                    return '<p>' + 'Welcome to ' + serviceName + ' ' + user.fullname + '!' +'</p>' +
                           '<p>' + 'You have now linked your Instagram account to this service' + '</p>';
                },
                title: function () {
                    return 'You linked your Instagram account to our service';
                }
            }
        },
        local: {
            signup: {
                message: function (user, route, token) {
                    return '<p>' + 'Welcome to ' + serviceName + ' ' + user.fullname + '!' +'</p>' +
                           '<p>' + 'You registered on our website' + '</p>' +
                           '<p>' + 'Please follow ' + '<a href="' + route + '?token=' + token + '">this link</a>' +' to verify your account: ' + '</p>';
                },
                title: function () {
                    return 'You signed up to our service! Please verify your email';
                }
            }
        }
    };
};
