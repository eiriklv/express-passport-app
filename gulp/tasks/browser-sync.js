var browserSync = require('browser-sync');
var gulp = require('gulp');

var proxyDomain = process.env.CLIENT_DOMAIN || 'localhost';

var proxyHost = proxyDomain !== 'localhost' ?
    (proxyDomain) :
    (proxyDomain + ':' + process.env.PORT);

gulp.task('browser-sync', ['run'], function(callback) {
    browserSync({
        proxy: proxyHost,
        port: 5000,
        notify: true,
        files: "./client/public/**"
    });

    callback();
});
