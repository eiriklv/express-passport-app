var globalHandler = require('./global');
var sessionHandler = require('./session');

exports = module.exports = function(io, ipc) {
    io.on('connection', function(socket) {
        globalHandler(socket, ipc);
        sessionHandler(socket, ipc);
    });
};
