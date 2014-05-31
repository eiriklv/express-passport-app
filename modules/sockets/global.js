var debug = require('debug')('authentication:socketio:global');
var util = require('util');

exports = module.exports = function (io, ipc) {
    io.sockets.on('connection', function (socket) {
        debug('global socket connected');

        //ipc.on('someevent', someFunction);

        socket.on('disconnect', function () {
            //ipc.removeListener('someevent', someFunction);
            debug('global socket disconnected');
        });
    });
};