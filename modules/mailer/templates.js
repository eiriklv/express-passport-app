exports = module.exports = function (serviceName) {
    return {
        facebook: {
            signup: {
                message: function (name) {
                    return '<p>' + 'Welcome to ' + serviceName + ' ' + name + '!' +'</p>' +
                           '<p>' + 'You registered through Facebook' + '</p>';
                },
                title: function () {
                    return 'Signup via Facebook';
                }
            },
            link: {
                message: function (name) {
                    return '<p>' + 'Welcome to ' + serviceName + ' ' + name + '!' +'</p>' +
                           '<p>' + 'You have now linked your Facebook account to this service' + '</p>';
                },
                title: function () {
                    return 'You linked your Facebook account to our service';
                }
            }
        },
        google: {
            signup: {
                message: function (name) {
                    return '<p>' + 'Welcome to ' + serviceName + ' ' + name + '!' +'</p>' +
                           '<p>' + 'You registered through Google+' + '</p>';
                },
                title: function () {
                    return 'Signup via Google+';
                }
            },
            link: {
                message: function (name) {
                    return '<p>' + 'Welcome to ' + serviceName + ' ' + name + '!' +'</p>' +
                           '<p>' + 'You have now linked your Google+ account to this service' + '</p>';
                },
                title: function () {
                    return 'You linked your Google+ account to our service';
                }
            }
        },
        instagram: {
            link: {
                message: function (name) {
                    return '<p>' + 'Welcome to ' + serviceName + ' ' + name + '!' +'</p>' +
                           '<p>' + 'You have now linked your Instagram account to this service' + '</p>';
                },
                title: function () {
                    return 'You linked your Instagram account to our service';
                }
            }
        },
        local: {
            signup: {
                message: function (name, route, token) {
                    return '<p>' + 'Welcome to ' + serviceName + ' ' + name + '!' +'</p>' +
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
