var debug = require('debug')('authentication:socketio:session');
var util = require('util');

exports = module.exports = function(socket, ipc) {
    debug('session socket connected with:');
    debug(util.inspect(socket.handshake.session));

    socket.emit('message', {
        msg: 'private hello'
    });

    //ipc.on('someevent', someFunction);

    socket.on('message', function(data) {
        debug('got message via session socket: ' + data);
    });

    socket.on('disconnect', function() {
        //ipc.removeListener('someevent', someFunction);
        debug('session socket disconnected');
    });
};
