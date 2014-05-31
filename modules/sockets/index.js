exports = module.exports = function (io, ioSession, ipc) {
    require('./global')(io, ipc);
    require('./session-global')(ioSession, ipc);
};