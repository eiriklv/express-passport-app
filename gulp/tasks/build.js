var gulp = require('gulp');

gulp.task('build', ['style-check', 'stylus', 'browserify']);
