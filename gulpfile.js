var gulp = require('gulp-param')(require('gulp'), process.argv),
    bump = require('gulp-bump'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
    install = require('gulp-install'),
    rimraf = require('gulp-rimraf'),
    connect = require('gulp-connect');


gulp.task('clear', function() {
    return gulp.src('./dist')
        .pipe(rimraf({
            force: true
        }));
});

gulp.task('install', ['clear'], function() {
    gulp.src('./bower.json')
        .pipe(install());
});
gulp.task('bump-in-html', function(semver) {
    gulp.src('index.html')
        .pipe(replace(/(\(\d\.\d\.\d\))/gi, '(' + semver + ")"))
        .pipe(gulp.dest('./'));
});

// usage: gulp bump -s <% Version %>
// usage: gulp bump --semver <% Version %>
gulp.task('bump', ['bump-in-html', 'install'], function(semver) {
    if (typeof semver !== 'string' || semver.length <= 0) {
        console.error('pass a new version `gulp bump --semver 2.4.1`');
        process.exit(1);
    }

    return gulp.src('package.json')
        .pipe(bump({
            version: semver
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('connect', function() {
    connect.server();
});
