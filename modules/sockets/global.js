var debug = require('debug')('authentication:socketio:global');
var util = require('util');

exports = module.exports = function(socket, ipc) {
    debug('global socket connected');

    socket.emit('message', {
        msg: 'global hello'
    });

    //ipc.on('someevent', someFunction);

    socket.on('disconnect', function() {
        //ipc.removeListener('someevent', someFunction);
        debug('global socket disconnected');
    });
};
