var debug = require('debug')('authentication:socketio:session-global');
var util = require('util');

exports = module.exports = function (ioSession, ipc) {
    ioSession.on('connection', function (err, socket, session) {
        if (err) return debug(util.inspect(err));

        debug('session socket connected with');
        debug(util.inspect(session));

        //ipc.on('someevent', someFunction);

        socket.on('message', function (data) {
            debug('got message via session socket: ' + data);
        });

        socket.on('disconnect', function () {
            //ipc.removeListener('someevent', someFunction);
            debug('session socket disconnected');
        });
    });
};