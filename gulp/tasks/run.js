var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gutil = require('gulp-util');

gulp.task('run', ['watch', 'default-watch'], function(callback) {
    nodemon({
        script: 'app.js',
        ext: 'js',
        ignore: ['node_modules/**'],
        legacyWatch: true
    })
        .on('restart', function() {
            gutil.log('server restarted!');
        });

    callback();
});
