var gulp = require('gulp');
var jsxcs = require('gulp-jsxcs');

var filePaths = [
    '**/*.js',
    '!node_modules/**',
    '!client/public/**'
];

gulp.task('style-check', function () {
    return gulp.src(filePaths)
        .pipe(jsxcs());
});
